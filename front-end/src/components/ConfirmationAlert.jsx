import React, { useEffect } from 'react';

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Êtes-vous sûr ?", 
  message, 
  confirmText = "Confirmer", 
  cancelText = "Annuler",
  type = "warning" // puede ser: 'warning', 'danger', 'success'
}) {
  
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Configuración de estilos según el tipo
  const themes = {
    warning: {
      bgIcon: "bg-amber-50",
      iconColor: "text-amber-600",
      btnConfirm: "bg-black hover:bg-gray-900",
      iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    },
    danger: {
      bgIcon: "bg-red-50",
      iconColor: "text-red-600",
      btnConfirm: "bg-red-600 hover:bg-red-700",
      iconPath: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    }
  };

  const currentTheme = themes[type] || themes.warning;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose} // Cerrar al hacer clic fuera
    >
      <div 
        className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic interno cierre el modal
      >
        {/* Icono */}
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${currentTheme.bgIcon}`}>
          <svg className={`h-8 w-8 ${currentTheme.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={currentTheme.iconPath} />
          </svg>
        </div>

        {/* Texto */}
        <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-2">
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 mb-8 font-medium leading-relaxed px-4">
          {message}
        </p>

        {/* Acciones */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-2 rounded-2xl text-[10px] font-extrabold uppercase text-gray-400 hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-4 px-2 rounded-2xl text-[10px] font-extrabold uppercase text-white shadow-lg transition-all active:scale-95 ${currentTheme.btnConfirm}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}