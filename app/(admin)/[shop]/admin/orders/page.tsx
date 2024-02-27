import { OrdersTable } from "@/features/builder/OrdersTable";

export default function Orders({ params }: { params: { shop: string } }) {
  return <OrdersTable shopLink={params.shop} />;
}
