import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';
  const actionLabel = (location.state as any)?.actionLabel || '';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
      navigate(from, { replace: true });
    }, 700);
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold mb-3">Iniciar sesión</h2>
      {actionLabel && (
        <p className="text-sm text-slate-500 mb-3">Necesitas iniciar sesión para {actionLabel}.</p>
      )}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-xs font-semibold">Correo</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-3 rounded-xl border bg-slate-50" />
        </div>
        <div>
          <label className="text-xs font-semibold">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-3 rounded-xl border bg-slate-50" />
        </div>
        <div className="pt-2">
          <button disabled={loading} className="w-full py-3 bg-emerald-800 text-white rounded-xl font-bold">
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
