import React, { useState } from 'react';
import {
  Sliders,
  MapPin,
  ShieldCheck,
  History,
  Settings as SettingsIcon,
  UserPlus,
  Lock,
  CheckCircle2,
  DollarSign,
  Clock,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { Badge, StatusBadge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const SettingsModule = () => {
  const {
    deliveryZones,
    updateDeliveryZone,
    adminUsers,
    addAdminUser,
    platformSettings,
    updatePlatformSettings,
    auditLogs
  } = useAdmin();

  // Sub-tabs: zones, pricing, roles, audit
  const [activeTab, setActiveTab] = useState('zones');

  // Platform Settings local form state
  const [settingsForm, setSettingsForm] = useState(platformSettings);

  // New Admin User Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Operations & Fleet Dispatcher',
    department: 'Logistics',
    permissions: ['orders_manage', 'riders_dispatch']
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updatePlatformSettings(settingsForm);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    addAdminUser(newUser);
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'Operations & Fleet Dispatcher',
      department: 'Logistics',
      permissions: ['orders_manage', 'riders_dispatch']
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Platform Settings</h1>
            <p className="text-sm text-slate-500">
              Delivery zones, surge pricing, platform commissions, team roles & permissions, and audit logs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'roles' && (
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5 hover-lift active-press"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Teammate</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex border-b border-slate-200/80 bg-white px-4 rounded-xl shadow-soft overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'zones', label: `Delivery Zones (${deliveryZones.length})`, icon: MapPin },
          { id: 'pricing', label: 'Platform & Pricing Settings', icon: SettingsIcon },
          { id: 'roles', label: `Admin Roles & Team (${adminUsers.length})`, icon: ShieldCheck },
          { id: 'audit', label: `Audit Logs (${auditLogs.length})`, icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DELIVERY ZONES & SURGE PRICING */}
      {/* ========================================================================= */}
      {activeTab === 'zones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deliveryZones.map((zone) => {
              const isSurging = zone.surgeMultiplier > 1.0;
              return (
                <div key={zone.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card hover-lift transition-all space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-bold text-slate-900 text-base">{zone.name}</h3>
                      </div>
                      <p className="text-xs text-slate-400">{zone.city} • Radius: {zone.coverageRadiusKm} km</p>
                    </div>
                    <Badge variant={isSurging ? 'warning' : 'success'}>
                      {zone.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Active Couriers</span>
                      <strong className="text-slate-900 font-bold text-sm">{zone.activeCouriers}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Base Fee</span>
                      <strong className="text-slate-900 font-bold text-sm">${zone.baseDeliveryFee.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Guaranteed ETA</span>
                      <strong className="text-emerald-600 font-bold text-sm">{zone.guaranteedEtaMinutes} mins</strong>
                    </div>
                  </div>

                  {/* Surge Multiplier Control */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">Surge Multiplier: {zone.surgeMultiplier}x</span>
                      <span className="text-[10px] text-slate-500">{zone.surgeReason}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1.0, 1.25, 1.5, 2.0].map((mult) => (
                        <button
                          key={mult}
                          onClick={() => updateDeliveryZone(zone.id, {
                            surgeMultiplier: mult,
                            status: mult > 1.0 ? 'Surge Active' : 'Normal',
                            surgeReason: mult > 1.0 ? 'Manual Peak Demand Override' : 'Normal Conditions'
                          })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover-lift active-press ${
                            zone.surgeMultiplier === mult
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {mult}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PLATFORM & PRICING SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'pricing' && (
        <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft max-w-3xl space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Global Pricing & Platform Settings</h3>
            <p className="text-xs text-slate-500">Tune platform service commission, cancellation grace periods & courier dispatching</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={settingsForm.platformName}
                onChange={(e) => setSettingsForm({ ...settingsForm, platformName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Support Email</label>
              <input
                type="email"
                value={settingsForm.supportEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Standard Commission Rate (%)</label>
              <input
                type="number"
                step="0.5"
                value={settingsForm.standardPlatformCommission}
                onChange={(e) => setSettingsForm({ ...settingsForm, standardPlatformCommission: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Default Minimum Order Value ($)</label>
              <input
                type="number"
                step="0.5"
                value={settingsForm.minOrderValueDefault}
                onChange={(e) => setSettingsForm({ ...settingsForm, minOrderValueDefault: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Night Delivery Surcharge ($)</label>
              <input
                type="number"
                step="0.5"
                value={settingsForm.nightDeliverySurcharge}
                onChange={(e) => setSettingsForm({ ...settingsForm, nightDeliverySurcharge: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Cancellation Window (Minutes)</label>
              <input
                type="number"
                value={settingsForm.cancellationGraceMinutes}
                onChange={(e) => setSettingsForm({ ...settingsForm, cancellationGraceMinutes: parseInt(e.target.value, 10) || 5 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <span className="font-bold text-slate-800 block">Operational Algorithm Toggles</span>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">AI Courier Auto-Assignment</span>
                <span className="text-slate-400 text-[11px]">Dispatches orders automatically using distance & ETA heuristics</span>
              </div>
              <input
                type="checkbox"
                checked={settingsForm.autoAssignCourierAlgo}
                onChange={(e) => setSettingsForm({ ...settingsForm, autoAssignCourierAlgo: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
              <div>
                <span className="font-semibold text-slate-800 block">Platform Maintenance Mode</span>
                <span className="text-slate-400 text-[11px]">Temporarily halts customer app checkouts with friendly banner</span>
              </div>
              <input
                type="checkbox"
                checked={settingsForm.maintenanceMode}
                onChange={(e) => setSettingsForm({ ...settingsForm, maintenanceMode: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 hover-lift active-press"
            >
              Save Platform Configuration
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ADMIN ROLES & TEAM PERMISSIONS */}
      {/* ========================================================================= */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Authorized Team Accounts & RBAC Roles</h3>
                <p className="text-xs text-slate-500">Configure access control levels, 2FA enforcement, and permission scopes</p>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 hover-lift active-press"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Invite Teammate
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-4">Role & Department</th>
                    <th className="py-3 px-4">Permissions</th>
                    <th className="py-3 px-4">2FA Security</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 block">{user.name}</span>
                            <span className="text-[10px] text-slate-400">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800 block">{user.role}</span>
                        <span className="text-[10px] text-slate-400">{user.department}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {user.permissions.slice(0, 3).map((p) => (
                            <span key={p} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">
                              {p}
                            </span>
                          ))}
                          {user.permissions.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-bold">
                              +{user.permissions.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {user.twoFactorEnabled ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <Lock className="w-3.5 h-3.5" /> Enforced
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Optional</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {user.lastActive}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={user.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AUDIT LOGS */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Administrative Audit Trail</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Immutable audit ledger</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      log.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : log.status === 'Warning'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>By: <strong className="text-slate-700">{log.actor}</strong> ({log.role})</span>
                    <span>•</span>
                    <span>IP: {log.ipAddress}</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 whitespace-nowrap">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD ADMIN TEAM MEMBER */}
      {/* ========================================================================= */}
      {showAddUserModal && (
        <Modal
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          title="Invite Teammate to Admin Panel"
        >
          <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="e.g. Rachel Adams"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Work Email *</label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="rachel.a@mealrush.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Designation *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Operations & Fleet Dispatcher">Operations & Fleet Dispatcher</option>
                  <option value="Customer Support Agent">Customer Support Agent</option>
                  <option value="Finance & Accounting Analyst">Finance & Accounting Analyst</option>
                  <option value="Growth & Marketing Specialist">Growth & Marketing Specialist</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 hover-lift active-press"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 hover-lift active-press"
              >
                Send Invite
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
