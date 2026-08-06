import React from 'react';
import { 
  Upload, 
  Sparkles, 
  Plus, 
  X, 
  CheckCircle2, 
  Repeat, 
  ShoppingBag, 
  Leaf, 
  Info,
  HelpCircle
} from 'lucide-react';
import { Product, Category, GarmentCondition, TransactionType, UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';

interface PublishViewProps {
  user: UserProfile;
  onPublishProduct: (product: Product) => void;
}

export const PublishView: React.FC<PublishViewProps> = ({
  user,
  onPublishProduct,
}) => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState<string[]>([
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'
  ]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<Category>('mujer');
  const [size, setSize] = React.useState('M');
  const [brand, setBrand] = React.useState('');
  const [material, setMaterial] = React.useState('Algodón 100%');
  const [condition, setCondition] = React.useState<GarmentCondition>('excelente');
  const [transactionType, setTransactionType] = React.useState<TransactionType>('both');
  const [price, setPrice] = React.useState<number>(75);
  const [tagsInput, setTagsInput] = React.useState('Vintage, Algodón, Casual');
  const [isAiGenerating, setIsAiGenerating] = React.useState(false);
  const [published, setPublished] = React.useState(false);

  // Predefined sample images for quick mock additions
  const sampleImages = [
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
  ];

  const addSampleImage = () => {
    const nextImg = sampleImages[images.length % sampleImages.length];
    setImages(prev => [...prev, nextImg]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // AI Assistant trigger
  const handleGenerateAiDetails = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setTitle('Chaqueta de Mezclilla Vintage Edición Especial');
      setDescription('Prenda atemporal confeccionada en mezclilla gruesa de algodón 100%. Mantiene un color azul profundo con lavado a piedra natural. Ideal para capas en otoño o primavera. Sin desgastes ni costuras rotas.');
      setBrand('Levi\'s Vintage');
      setMaterial('Algodón 100% Reciclado');
      setCategory('vintage');
      setCondition('excelente');
      setPrice(85);
      setTagsInput('Denim, Streetwear, Algodón Orgánico, ReVuelta Pick');
      setIsAiGenerating(false);
    }, 1200);
  };

  const calculatedCo2 = Math.round((price * 0.12) * 10) / 10 + 6.5;
  const calculatedWater = Math.round(price * 32) + 1800;
  const calculatedPoints = Math.round(price * 1.2) + 40;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || images.length === 0) return;

    const newProduct: Product = {
      id: `p_${Date.now()}`,
      title,
      description: description || 'Prenda en excelente estado buscando nuevo dueño para continuar su ciclo de vida.',
      price: Number(price) || 50,
      originalPrice: Number(price) * 2,
      ecoPointsReward: calculatedPoints,
      images,
      category,
      size,
      brand: brand || 'Genérica',
      material: material || 'Algodón',
      condition,
      transactionType,
      sellerId: user.id,
      seller: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        rating: 5.0,
        reviewsCount: 1,
        location: user.location,
        bio: 'Miembro activo de moda circular ReVuelta.',
        isVerifiedEco: true,
        memberSince: '2024',
        co2SavedKg: user.co2SavedKg,
        itemsSold: 1,
        swapsDone: 1,
      },
      co2SavedKg: calculatedCo2,
      waterSavedLiters: calculatedWater,
      likesCount: 1,
      createdAt: 'Ahora mismo',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    };

    onPublishProduct(newProduct);
    setPublished(true);
  };

  if (published) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-xl space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">¡Prenda Publicada con Éxito!</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Tu prenda ya se encuentra disponible en el catálogo de <strong>ReVuelta</strong>. Ya puedes recibir propuestas de trueque o solicitudes de compra.
        </p>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-900 text-xs font-medium space-y-1">
          <p>🎉 Ganaste <strong className="text-emerald-800">+50 EcoPuntos</strong> por aportar a la economía circular.</p>
          <p>🌱 Evitaste ~{calculatedCo2}kg de emisiones de CO₂ a la atmósfera.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => navigate('/explore')}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            Ver en Catálogo
          </button>
          <button
            onClick={() => setPublished(false)}
            className="px-6 py-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-xs hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            Publicar otra prenda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-8 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block mb-1">
            Circular Moda Lab
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold">Publicar nueva Prenda o Trueque</h1>
          <p className="text-emerald-100/90 text-sm mt-1">
            Completa los detalles de tu prenda. ¡Ganarás EcoPuntos apenas se publique!
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateAiDetails}
          disabled={isAiGenerating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 ${isAiGenerating ? 'animate-spin' : ''}`} />
          <span>{isAiGenerating ? 'Generando con IA...' : 'Asistente IA Auto-Completar'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
        
        {/* Section 1: Photos */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-extrabold">1</span>
            Fotografías de la Prenda
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1 bg-slate-900/80 text-white rounded-full hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addSampleImage}
              className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group text-slate-500 hover:text-emerald-700"
            >
              <Upload className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-center">+ Añadir Foto</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Recomendación: Muestra el frente, espalda y etiquetas de la marca y composición.</p>
        </div>

        {/* Section 2: Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-extrabold">2</span>
            Información Principal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Prenda *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Casaca Oversized Denim Vintage 90s"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Marca *</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ej: Levi's, Zara, Patagonia, Handmade"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Categoría *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
                <option value="unisex">Unisex</option>
                <option value="calzado">Calzado</option>
                <option value="accesorios">Accesorios</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Talla *</label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Ej: S, M, L, 38, Única"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Material / Composición</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Ej: Algodón 100%, Lino, Alpaca"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Estado de la Prenda *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'nuevo_con_etiqueta', label: 'Nuevo c/ etiqueta', desc: 'Nunca usado' },
                { id: 'excelente', label: 'Excelente estado', desc: 'Uso mínimo, impecable' },
                { id: 'buen_estado', label: 'Buen estado', desc: 'Uso normal sin fallas' },
                { id: 'usado_aceptable', label: 'Usado con vida', desc: 'Pequeño detalle vintage' },
              ].map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCondition(c.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    condition === c.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-400'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">{c.label}</p>
                  <p className="text-[10px] text-slate-500">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descripción detallada</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Cuenta la historia de la prenda, medidas exactas o sugerencias de combinación..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Section 3: Transaction Type & Pricing */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-extrabold">3</span>
            Modalidad de Publicación & Precio
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'both', title: 'Venta o Trueque', desc: 'Acepta dinero o propuestas de intercambio' },
              { id: 'swap', title: 'Solo Trueque', desc: 'Solo intercambio sin dinero de por medio' },
              { id: 'sale', title: 'Solo Venta', desc: 'Compra directa a precio fijo' },
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTransactionType(t.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  transactionType === t.id
                    ? 'border-emerald-600 bg-emerald-950 text-white shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Repeat className="w-4 h-4 text-teal-300" />
                  <p className="text-xs font-bold">{t.title}</p>
                </div>
                <p className="text-[11px] opacity-80">{t.desc}</p>
              </button>
            ))}
          </div>

          {transactionType !== 'swap' && (
            <div className="max-w-xs">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Precio Estimado (S/.) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">S/.</span>
                <input
                  type="number"
                  required
                  min="5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Environmental Impact Preview */}
          <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" />
                Cálculo de Impacto Positivo Estimado
              </span>
              <p className="text-xs text-emerald-100">
                Ahorrarás <strong className="text-white">~{calculatedCo2} kg de CO₂</strong> y <strong className="text-white">~{calculatedWater} Litros de agua</strong> al mantener esta prenda en circulación.
              </p>
            </div>

            <div className="bg-emerald-800/80 px-4 py-2 rounded-xl text-center font-bold text-amber-300 text-xs whitespace-nowrap">
              Recibirás +{calculatedPoints} EcoPuntos
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-base hover:opacity-95 shadow-xl transition-all cursor-pointer"
        >
          Publicar Prenda en ReVuelta
        </button>

      </form>

    </div>
  );
};
