import React, { useState } from 'react';
import { Phone, UserPlus, AlertCircle, Shield, Heart, Edit2, Trash2, Save, X } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'John Doe', phone: '+1 234-567-8900', relation: 'Spouse' },
    { id: '2', name: 'Jane Smith', phone: '+1 234-567-8901', relation: 'Sibling' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', relation: '' });

  const governmentNumbers = [
    { name: 'Emergency Services', number: '911', icon: AlertCircle, color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { name: 'Police', number: '100', icon: Shield, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'Fire Department', number: '101', icon: AlertCircle, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { name: 'Medical Emergency', number: '102', icon: Heart, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
  ];

  const handleAdd = () => {
    if (formData.name && formData.phone && formData.relation) {
      setContacts([...contacts, { ...formData, id: Date.now().toString() }]);
      setFormData({ name: '', phone: '', relation: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setFormData({ name: contact.name, phone: contact.phone, relation: contact.relation });
  };

  const handleUpdate = () => {
    if (formData.name && formData.phone && formData.relation) {
      setContacts(contacts.map(c => c.id === editingId ? { ...c, ...formData } : c));
      setEditingId(null);
      setFormData({ name: '', phone: '', relation: '' });
    }
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-8 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Emergency Contacts</h1>
            <p className="text-red-100 text-sm mt-1">Quick access in critical situations</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Government Emergency Numbers */}
        <div className="card mb-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-gray-800">Government Emergency Services</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {governmentNumbers.map((service) => (
              <button
                key={service.number}
                onClick={() => handleCall(service.number)}
                className={`${service.bgColor} border-2 ${service.borderColor} rounded-xl p-4 hover:shadow-lg transition-all active:scale-95`}
              >
                <div className={`bg-gradient-to-r ${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-bold text-gray-800 mb-1">{service.name}</p>
                <p className="text-2xl font-bold text-gray-900">{service.number}</p>
              </button>
            ))}
          </div>
          <div className="mt-4 bg-white rounded-lg p-3 border-2 border-red-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700">
                <span className="font-bold">Important:</span> These numbers connect you to emergency services. 
                Use them only for genuine emergencies.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Emergency Contacts */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Personal Contacts</h2>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                {isAdding ? 'Add New Contact' : 'Edit Contact'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234-567-8900"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Relationship</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Child">Child</option>
                    <option value="Friend">Friend</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={isAdding ? handleAdd : handleUpdate}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                      setFormData({ name: '', phone: '', relation: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all flex items-center justify-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contacts List */}
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No emergency contacts added yet</p>
                <p className="text-gray-400 text-xs mt-1">Add contacts for quick access during emergencies</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full">{contact.relation}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCall(contact.phone)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-full hover:shadow-lg transition-all active:scale-95"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(contact)}
                        className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="bg-red-100 text-red-600 p-3 rounded-full hover:bg-red-200 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Safety Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Keep your emergency contacts up to date</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Share your medical information with emergency contacts</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>Know the local emergency numbers when traveling</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold mt-0.5">•</span>
              <span>In case of emergency, stay calm and call for help immediately</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
