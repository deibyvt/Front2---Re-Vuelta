import { Product, Seller, UserProfile, Order, SwapOffer, EcoReward, Review } from '../types';

export const MOCK_SELLERS: Record<string, Seller> = {
  s1: {
    id: 's1',
    name: 'Camila Ríos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    rating: 4.9,
    reviewsCount: 38,
    location: 'Lima, Miraflores',
    bio: 'Apasionada por la moda vintage y el consumo responsable. Ropa cuidada con mucho amor 🌿✨',
    isVerifiedEco: true,
    memberSince: 'Marzo 2023',
    co2SavedKg: 142.5,
    itemsSold: 29,
    swapsDone: 14,
  },
  s2: {
    id: 's2',
    name: 'Mateo & Co.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    reviewsCount: 52,
    location: 'Arequipa, Yanahuara',
    bio: 'Prendas masculinas y unisex streetwear sustentable. Trueques abiertos siempre 🔄',
    isVerifiedEco: true,
    memberSince: 'Noviembre 2022',
    co2SavedKg: 210.0,
    itemsSold: 45,
    swapsDone: 22,
  },
  s3: {
    id: 's3',
    name: 'Sofía EcoCloset',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    rating: 5.0,
    reviewsCount: 19,
    location: 'Cusco, San Blas',
    bio: 'Rescatando prendas étnicas y tejidas en fibras naturales. 100% alpaca y algodón orgánico.',
    isVerifiedEco: true,
    memberSince: 'Enero 2024',
    co2SavedKg: 88.0,
    itemsSold: 12,
    swapsDone: 9,
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Casaca Oversized Denim Vintage 90s',
    description: 'Chaqueta de mezclilla azul clásico estilo noventero. Algodón 100% grueso y duradero, lavada a piedra. Sin desgastes visibles, botones metálicos originales.',
    price: 89,
    originalPrice: 190,
    ecoPointsReward: 120,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'vintage',
    size: 'M',
    brand: 'Levi\'s Classic',
    material: 'Algodón 100%',
    condition: 'excelente',
    transactionType: 'both',
    sellerId: 's1',
    seller: MOCK_SELLERS.s1,
    co2SavedKg: 12.4,
    waterSavedLiters: 3500,
    likesCount: 24,
    isFeatured: true,
    createdAt: 'Hace 2 horas',
    tags: ['Vintage', 'Streetwear', 'Acepta Trueque', 'Algodón Orgánico']
  },
  {
    id: 'p2',
    title: 'Vestido Midi Floral Bohemio Sostenible',
    description: 'Vestido fluido de viscosa eco-friendly con estampado botánico sutil. Muy fresco, ideal para primavera y verano. Caída favorecedora con lazo ajustable.',
    price: 65,
    originalPrice: 130,
    ecoPointsReward: 90,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'mujer',
    size: 'S',
    brand: 'Reformation style',
    material: 'Viscosa EcoVero',
    condition: 'excelente',
    transactionType: 'sale',
    sellerId: 's1',
    seller: MOCK_SELLERS.s1,
    co2SavedKg: 8.2,
    waterSavedLiters: 2100,
    likesCount: 18,
    isFeatured: true,
    createdAt: 'Ayer',
    tags: ['Verano', 'Sostenible', 'Florido']
  },
  {
    id: 'p3',
    title: 'Chompa Tejida Algodón Pima & Alpaca',
    description: 'Tejido artesanal andino super suave en tono crema natural. Hipoalergénico y cálido. Conserva perfecta forma y no tiene pelotillas.',
    price: 110,
    originalPrice: 240,
    ecoPointsReward: 150,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'unisex',
    size: 'L',
    brand: 'Kuna Artisan',
    material: 'Alpaca & Algodón Pima',
    condition: 'nuevo_con_etiqueta',
    transactionType: 'both',
    sellerId: 's3',
    seller: MOCK_SELLERS.s3,
    co2SavedKg: 16.0,
    waterSavedLiters: 4200,
    likesCount: 42,
    isFeatured: true,
    createdAt: 'Hace 3 días',
    tags: ['Fibra Natural', 'Tejido', 'Trueque Destacado']
  },
  {
    id: 'p4',
    title: 'Zapatillas Veja Campo White Black (Talla 41)',
    description: 'Zapatillas ecológicas de cuero de curtido libre de cromo y suela de caucho silvestre amazónico. Usadas 3 veces, impecables.',
    price: 185,
    originalPrice: 380,
    ecoPointsReward: 200,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'calzado',
    size: '41 EUR (8.5 US)',
    brand: 'Veja',
    material: 'Cuero ecológico & Caucho silvestre',
    condition: 'excelente',
    transactionType: 'sale',
    sellerId: 's2',
    seller: MOCK_SELLERS.s2,
    co2SavedKg: 14.5,
    waterSavedLiters: 2900,
    likesCount: 31,
    isFeatured: true,
    createdAt: 'Hace 1 día',
    tags: ['Eco Sneakers', 'Streetwear', 'Como Nuevo']
  },
  {
    id: 'p5',
    title: 'Polera Hoodie Minimalista Beige Organic',
    description: 'Polera con capucha 100% algodón orgánico peinado. Interior franelado super afelpado. Corte relajado moderno unisex.',
    price: 75,
    originalPrice: 150,
    ecoPointsReward: 100,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'hombre',
    size: 'M',
    brand: 'Patagonia Minimal',
    material: 'Algodón Orgánico Certificado GOTS',
    condition: 'buen_estado',
    transactionType: 'both',
    sellerId: 's2',
    seller: MOCK_SELLERS.s2,
    co2SavedKg: 9.8,
    waterSavedLiters: 2700,
    likesCount: 15,
    isFeatured: false,
    createdAt: 'Hace 4 días',
    tags: ['Basic', 'Minimalista', 'Acepta Trueque']
  },
  {
    id: 'p6',
    title: 'Bolso Tote Bag Cuero Reutilizado & Lona',
    description: 'Bolso tote artesanal confeccionado a mano reutilizando sobrantes de cuero legítimo y lona de vela marina. Muy amplio con compartimento para laptop de 15".',
    price: 95,
    originalPrice: 200,
    ecoPointsReward: 130,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'accesorios',
    size: 'Única (40x35cm)',
    brand: 'Upcycled Goods',
    material: 'Cuero Reciclado & Lona Heavy Duty',
    condition: 'nuevo_con_etiqueta',
    transactionType: 'swap',
    sellerId: 's3',
    seller: MOCK_SELLERS.s3,
    co2SavedKg: 11.2,
    waterSavedLiters: 1800,
    likesCount: 29,
    isFeatured: false,
    createdAt: 'Hace 5 días',
    tags: ['Upcycling', 'Solo Trueque', 'Handmade']
  }
];

export const DEMO_USER_PROFILE: UserProfile = {
  id: 'u_me',
  name: 'Valeria Mendoza',
  email: 'valeria.circular@revuelta.pe',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  location: 'Lima, San Isidro',
  ecoPoints: 480,
  ecoTier: 'Eco Warrior',
  co2SavedKg: 64.8,
  waterSavedLiters: 18400,
  treesEquivalent: 3,
  favoriteIds: ['p1', 'p3', 'p4'],
  myClosetItems: [
    {
      id: 'my_1',
      title: 'Saco Blazer Lino Beige Sostenible',
      description: 'Blazer de corte estructurado en lino natural. Ideal para trabajo u ocasión formal ligera.',
      price: 85,
      originalPrice: 180,
      ecoPointsReward: 110,
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'],
      category: 'mujer',
      size: 'M',
      brand: 'Zara Eco Collection',
      material: '100% Lino Natural',
      condition: 'excelente',
      transactionType: 'both',
      sellerId: 'u_me',
      seller: {
        id: 'u_me',
        name: 'Valeria Mendoza',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
        rating: 5.0,
        reviewsCount: 12,
        location: 'Lima, San Isidro',
        bio: 'Amante del diseño minimalista y materiales sostenibles.',
        isVerifiedEco: true,
        memberSince: 'Enero 2023',
        co2SavedKg: 64.8,
        itemsSold: 10,
        swapsDone: 6,
      },
      co2SavedKg: 10.5,
      waterSavedLiters: 2800,
      likesCount: 19,
      createdAt: 'Hace 1 semana',
      tags: ['Lino', 'Blazer', 'Acepta Trueque']
    },
    {
      id: 'my_2',
      title: 'Pantallón Culotte Tiro Alto Verde Olivo',
      description: 'Pantalón ancho en viscosa sostenible. Caída suave, cintura elastizada posterior.',
      price: 55,
      originalPrice: 110,
      ecoPointsReward: 70,
      images: ['https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800'],
      category: 'mujer',
      size: 'S/M',
      brand: 'Mango Committed',
      material: 'Viscosa Sustentable',
      condition: 'excelente',
      transactionType: 'both',
      sellerId: 'u_me',
      seller: {
        id: 'u_me',
        name: 'Valeria Mendoza',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
        rating: 5.0,
        reviewsCount: 12,
        location: 'Lima, San Isidro',
        bio: 'Amante del diseño minimalista y materiales sostenibles.',
        isVerifiedEco: true,
        memberSince: 'Enero 2023',
        co2SavedKg: 64.8,
        itemsSold: 10,
        swapsDone: 6,
      },
      co2SavedKg: 7.1,
      waterSavedLiters: 1900,
      likesCount: 11,
      createdAt: 'Hace 2 semanas',
      tags: ['Pantalón', 'Casual']
    }
  ]
};

export const INITIAL_SWAP_OFFERS: SwapOffer[] = [
  {
    id: 'so_1',
    targetProductId: 'my_1',
    targetProduct: DEMO_USER_PROFILE.myClosetItems[0],
    offeredProductIds: ['p3'],
    offeredProducts: [INITIAL_PRODUCTS[2]], // Chompa Tejida
    cashAdjustment: 15, // Camila ofrece la chompa + S/. 15
    note: '¡Hola Valeria! Me encanta tu blazer de lino. Te propongo mi chompa de alpaca Kuna + S/. 15 soles a tu favor. ¿Te parece coordinar en Parque Kennedy?',
    status: 'pending',
    senderId: 's3',
    senderName: 'Sofía EcoCloset',
    senderAvatar: MOCK_SELLERS.s3.avatar,
    createdAt: 'Hace 3 horas'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_101',
    type: 'buy',
    items: [INITIAL_PRODUCTS[1]],
    totalAmount: 65,
    ecoPointsEarned: 90,
    status: 'completado',
    date: '12 de Octubre 2024',
    shippingAddress: 'Av. Conquistadores 450, San Isidro',
    isRated: false
  },
  {
    id: 'ord_102',
    type: 'swap',
    items: [INITIAL_PRODUCTS[0]],
    totalAmount: 0,
    ecoPointsEarned: 120,
    status: 'pendiente_punto_encuentro',
    date: '18 de Octubre 2024',
    shippingAddress: 'Punto Ecológico ReVuelta - Jockey Plaza',
    isRated: false,
    swapOfferDetails: {
      offeredItems: [DEMO_USER_PROFILE.myClosetItems[1]],
      cashAdjustment: 0
    }
  }
];

export const ECO_REWARDS: EcoReward[] = [
  {
    id: 'r1',
    title: 'Cupón S/. 20 de Descuento',
    description: 'Válido para cualquier compra mayor a S/. 80 en la plataforma.',
    pointsCost: 200,
    code: 'CIRCULAR20',
    category: 'descuento',
    iconName: 'Tag',
    expiresAt: '30 días'
  },
  {
    id: 'r2',
    title: 'Envío Ecológico Gratuito',
    description: 'Envío en ciclomotor eléctrico dentro de Lima Metropolitana.',
    pointsCost: 150,
    code: 'BICIENVIO',
    category: 'envio',
    iconName: 'Truck',
    expiresAt: '15 días'
  },
  {
    id: 'r3',
    title: 'Plantación de 1 Árbol Nativo',
    description: 'Donación directa a la reforestación del bosque amazónico peruano con Pachamama Raymi.',
    pointsCost: 300,
    code: 'ARBOL-VERDE',
    category: 'donacion',
    iconName: 'TreePine',
    expiresAt: 'Permanente'
  },
  {
    id: 'r4',
    title: 'Kit de Lavado Ecológico Guppyfriend',
    description: 'Bolsa de lavado que atrapa microplásticos de la ropa sintética.',
    pointsCost: 450,
    code: 'KIT-MICROPLASTICO',
    category: 'marca_eco',
    iconName: 'Gift',
    expiresAt: 'Hasta agotar stock'
  }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    sellerId: 's1',
    reviewerName: 'Lucía B.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: '¡Súper recomendado! La prenda vino impecable, perfumada con aceites naturales y el empaque era de papel reciclado.',
    date: 'Hace 1 semana',
    itemName: 'Abrigo Lana Camel'
  },
  {
    id: 'rev_2',
    sellerId: 's1',
    reviewerName: 'Carlos M.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Hicimos un trueque directo en el punto de entrega. Excelente comunicación y la prenda exactamente como se describía.',
    date: 'Hace 3 semanas',
    itemName: 'Camisa Denim Vintage'
  }
];
