import pkg from 'pg';
const { Pool } = pkg;
import { dbConfig } from "../config.js";

const pool = new Pool(dbConfig);

export const savePaid = async (req, res) => {
    console.log("Recibiendo request en savePaid"); 
    const {
        customerId,
        total,        
        currency,
        saleItems,     
        paymentMethod,
        saleStatus,   
        transactionId,
        saleDate
    } = req.body;

    if (!customerId || !total || !currency || !saleItems || !paymentMethod || !saleStatus || !transactionId) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const saleQuery = `
      INSERT INTO sales (customer_id, total, currency, payment_method, sale_status, transaction_id, sale_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
        const saleValues = [
            customerId,
            total,
            currency,
            paymentMethod,
            saleStatus,
            transactionId,
            saleDate || new Date().toISOString()
        ];
        const saleResult = await client.query(saleQuery, saleValues);
        const saleId = saleResult.rows[0].id;

        const saleItemQuery = `
      INSERT INTO sale_items (sale_id, product_name, product_price, quantity)
      VALUES ($1, $2, $3, $4)
    `;
        for (let item of saleItems) {
            const { name, price, quantity } = item;
            await client.query(saleItemQuery, [saleId, name, price, quantity]);
        }
        await client.query("COMMIT");

        res.status(200).json({ message: "Venta registrada correctamente", saleId });
    } catch (err) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Error al hacer ROLLBACK", rollbackError);
        }
        console.error("Error al procesar la venta", err);
        res.status(500).json({ message: "Error al procesar la venta" });
    } finally {
        client.release();
    }
};
