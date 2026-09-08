'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRAND_NAME } from '@/lib/constants';

interface Stats {
  totalOrders: number;
  paidOrders: number;
  todayOrders: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    customerName: string;
    email: string;
    paymentStatus: string;
    amount: number;
    createdAt: string;
    product: { name: string };
    _count?: { downloadLogs: number };
  }>;
}

interface OrdersData {
  orders: Array<{
    id: string;
    customerName: string;
    email: string;
    mobile: string;
    paymentStatus: string;
    amount: number;
    createdAt: string;
    paidAt: string | null;
    product: { name: string };
    _count: { downloadLogs: number };
  }>;
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [ordersData, setOrdersData] = useState<OrdersData | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders'>('dashboard');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setStats(data);
    } catch { console.error('Failed to fetch stats'); }
  };

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({ page: page.toString(), search });
      const res = await fetch(`/api/admin/orders?${params}`);
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setOrdersData(data);
    } catch { console.error('Failed to fetch orders'); }
  };

  useEffect(() => {
    Promise.all([fetchStats(), fetchOrders()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchOrders(); }, [page, search]);

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="font-bold">{BRAND_NAME} Admin</span>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition-colors">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            Orders
          </button>
        </div>

        {activeTab === 'dashboard' && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Paid Orders</p>
                <p className="text-3xl font-bold text-success">{stats.paidOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Today&apos;s Orders</p>
                <p className="text-3xl font-bold text-secondary">{stats.todayOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-primary-300">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="font-semibold">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-800/50 text-sm">
                        <td className="px-6 py-3">{order.customerName}</td>
                        <td className="px-6 py-3 text-gray-400">{order.email}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.paymentStatus === 'PAID' ? 'bg-success/20 text-success' :
                            order.paymentStatus === 'FAILED' ? 'bg-accent/20 text-accent' :
                            'bg-secondary/20 text-secondary'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-3">₹{(order.amount / 100).toFixed(0)}</td>
                        <td className="px-6 py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by name, email, or order ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full max-w-md px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Orders Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Mobile</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Downloads</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData?.orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-800/50 text-sm">
                        <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 12)}...</td>
                        <td className="px-4 py-3">{order.customerName}</td>
                        <td className="px-4 py-3 text-gray-400">{order.email}</td>
                        <td className="px-4 py-3 text-gray-400">{order.mobile}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.paymentStatus === 'PAID' ? 'bg-success/20 text-success' :
                            order.paymentStatus === 'FAILED' ? 'bg-accent/20 text-accent' :
                            'bg-secondary/20 text-secondary'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">₹{(order.amount / 100).toFixed(0)}</td>
                        <td className="px-4 py-3 text-gray-400">{order._count.downloadLogs}</td>
                        <td className="px-4 py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {ordersData && ordersData.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
                  <p className="text-xs text-gray-400">Page {ordersData.page} of {ordersData.totalPages} ({ordersData.total} total)</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="px-3 py-1 bg-gray-800 rounded text-sm disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(ordersData.totalPages, p + 1))}
                      disabled={page >= ordersData.totalPages}
                      className="px-3 py-1 bg-gray-800 rounded text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
