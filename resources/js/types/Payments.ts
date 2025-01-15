// payments
export default interface PaymentsTypes {
    id: string;
    product_id: string;
    payment_type: string;
    transaction_id: string;
    transaction_time: string;
    transaction_status: string;
    amount: number;
}
