"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  orderStatus: "preparing" | "out_of_delivery" | "delivered" | "cancelled";
  paymentMethod: "cod" | "online";
  createdAt: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const dummyOrders: Order[] = [
      {
        _id: "1",
        orderNumber: "ORD-3474747-001",
        totalAmount: 2500,
        orderStatus: "preparing",
        paymentMethod: "cod",
        createdAt: "2025-10-05T10:30:00Z",
      },
      {
        _id: "2",
        orderNumber: "ORD-3474747-002",
        totalAmount: 1450,
        orderStatus: "delivered",
        paymentMethod: "online",
        createdAt: "2025-09-29T15:20:00Z",
      },
      {
        _id: "3",
        orderNumber: "ORD-3474747-003",
        totalAmount: 1800,
        orderStatus: "out_of_delivery",
        paymentMethod: "cod",
        createdAt: "2025-09-30T09:15:00Z",
      },
      {
        _id: "4",
        orderNumber: "ORD-3474747-004",
        totalAmount: 900,
        orderStatus: "cancelled",
        paymentMethod: "online",
        createdAt: "2025-09-25T08:45:00Z",
      },
      {
        _id: "5",
        orderNumber: "ORD-3474747-005",
        totalAmount: 3000,
        orderStatus: "preparing",
        paymentMethod: "cod",
        createdAt: "2025-09-20T11:10:00Z",
      },
      {
        _id: "6",
        orderNumber: "ORD-3474747-006",
        totalAmount: 2400,
        orderStatus: "delivered",
        paymentMethod: "online",
        createdAt: "2025-09-18T12:00:00Z",
      },
    ];
    setOrders(dummyOrders);
  }, []);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      case "out_of_delivery":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
        Order History
      </h2>

      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-orange-50">
            <TableRow>
              <TableHead className="w-[200px] font-semibold text-gray-700 uppercase text-sm px-4 text-left">
                Order Number
              </TableHead>
              <TableHead className="w-[120px] font-semibold text-gray-700 uppercase text-sm px-4 text-left">
                Order Date
              </TableHead>
              <TableHead className="w-[140px] font-semibold text-gray-700 uppercase text-sm px-4 text-left">
                Status
              </TableHead>
              <TableHead className="w-[100px] font-semibold text-gray-700 uppercase text-sm px-4 text-left">
                Payment
              </TableHead>
              <TableHead className="w-[150px] font-semibold text-gray-700 uppercase text-sm px-4 text-right">
                Total Amount
              </TableHead>
              <TableHead className="w-[140px] font-semibold text-gray-700 uppercase text-sm px-4 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <TableRow
                  key={order._id}
                  className="hover:bg-orange-50/40 border-b"
                >
                  <TableCell className="font-medium text-gray-800 py-4 px-4 text-left align-middle">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4 px-4 text-left align-middle">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-left align-middle">
                    <Badge
                      className={`${getStatusColor(
                        order.orderStatus
                      )} capitalize border px-3 py-1 text-xs font-medium whitespace-nowrap`}
                    >
                      {order.orderStatus.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 capitalize py-4 px-4 text-left align-middle">
                    <span className="whitespace-nowrap">
                      {order.paymentMethod === "online" ? "Online" : "COD"}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-800 font-medium py-4 px-4 text-right align-middle">
                    <span className="whitespace-nowrap">
                      Rs {order.totalAmount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right align-middle">
                    <Button
                      className="rounded-md text-sm whitespace-nowrap"
                      variant="outline"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-500 py-8 px-4"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {orders.length > ordersPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-600 whitespace-nowrap">
            Showing {indexOfFirst + 1} - {Math.min(indexOfLast, orders.length)}{" "}
            of {orders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </Button>
            <span className="text-sm font-medium text-gray-700 min-w-[100px] text-center whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}