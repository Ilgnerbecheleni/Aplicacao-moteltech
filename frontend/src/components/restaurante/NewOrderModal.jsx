'use client';

import { useState } from 'react';

export default function NewOrderModal({ onClose }) {
  const [selectedSuite, setSelectedSuite] = useState('1');
  const [orderItems, setOrderItems] = useState([{ item: '', quantity: 1 }]);
  const [notes, setNotes] = useState('');

  const handleAddItem = () => {
    setOrderItems([...orderItems, { item: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;
    setOrderItems(newItems);
  };

  const handleSaveOrder = () => {
    // Aqui iria a lógica para salvar o pedido
    console.log('Pedido salvo:', {
      suite: selectedSuite,
      items: orderItems,
      notes
    });
    onClose();
  };

  return (
    <div className="modal" id="newOrderModal">
      <div className="modal__container modal__container--large">
        <div className="modal__header">
          <h3 className="modal__title">Novo Pedido</h3>
          <button className="modal__close" id="closeOrderModal" onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <div className="modal__content">
          <div className="form-group">
            <label htmlFor="suiteSelect">Suíte</label>
            <select 
              id="suiteSelect" 
              className="form-control"
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
            >
              <option value="1">01 - BLACK</option>
              <option value="2">02 - ROYAL</option>
              <option value="3">03 - PREMIUM</option>
              <option value="4">04 - DELUXE</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Itens do Pedido</label>
            <div className="order-builder">
              {orderItems.map((item, index) => (
                <div className="order-builder__item" key={index}>
                  <select 
                    className="form-control"
                    value={item.item}
                    onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                  >
                    <option value="">Selecione um item</option>
                    <option value="bruschetta">Bruschetta</option>
                    <option value="carpaccio">Carpaccio</option>
                    <option value="file">Filé Mignon</option>
                    <option value="salmao">Salmão Grelhado</option>
                    <option value="risoto">Risoto de Funghi</option>
                    <option value="tiramisu">Tiramisu</option>
                    <option value="petit">Petit Gateau</option>
                  </select>
                  <input 
                    type="number" 
                    className="form-control form-control--small" 
                    min="1" 
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  />
                  <button 
                    className="btn btn--icon btn--remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              ))}
              
              <button 
                className="btn btn--secondary btn--small btn--add-item"
                onClick={handleAddItem}
              >
                <ion-icon name="add-outline"></ion-icon>
                Adicionar Item
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="orderNotes">Observações</label>
            <textarea 
              id="orderNotes" 
              className="form-control" 
              rows="3" 
              placeholder="Observações especiais para o pedido..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="modal__footer">
          <button className="btn btn--secondary" id="cancelOrderBtn" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary" id="saveOrderBtn" onClick={handleSaveOrder}>Salvar Pedido</button>
        </div>
      </div>
    </div>
  );
}