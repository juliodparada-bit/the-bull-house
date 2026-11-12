export const site = {
  name: "The Bull House",
  tagline: "Barbershop",
  since: "2013",
  claim: "Tú mereces lo mejor",
  claimSecondary: "Y aquí te lo brindamos",
  servicesClaim: "Tú mereces lo mejor, disfruta nuestros servicios",
  experienceClaim: "Vive la experiencia",
  experienceSub: "De verte y sentirte mejor",
  address: "Carrera 13 # 28-27 Edificio Palma Real - Local 19",
  city: "Bogotá, Colombia",
  mapsQuery: "Carrera 13 # 28-27 Edificio Palma Real Local 19 Bogotá",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573001234567",
  email: "contacto@thebullhouse.co",
  phoneDisplay: "+57 300 123 4567",
  hours: [
    { day: "Lunes – Viernes", time: "10:00 a.m. – 8:00 p.m." },
    { day: "Sábado", time: "9:00 a.m. – 7:00 p.m." },
    { day: "Domingo", time: "10:00 a.m. – 4:00 p.m." },
  ],
  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://instagram.com/thebullhouse_",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      "https://facebook.com/thebullhouse",
    tiktok:
      process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@thebullhouse",
  },
  about: [
    "Nacimos con el propósito de ofrecer mucho más que un corte de cabello o un arreglo de barba. Creamos un espacio cómodo, agradable y profesional donde cada cliente pueda disfrutar de una experiencia única mientras renueva su imagen y fortalece su confianza.",
    "Sabemos que la apariencia personal juega un papel importante en la vida del hombre moderno. Por eso, nuestro compromiso es ayudarte a proyectar la mejor versión de ti mismo, brindándote asesoría profesional, atención personalizada y servicios diseñados para resaltar tus mejores características.",
    "Somos el lugar ideal para quienes desean mantener, renovar o transformar su estilo. Contamos con conocimientos en técnicas de visagismo, asesoría de imagen, barbería clásica, tendencias modernas y estilos contemporáneos, permitiéndonos ofrecer recomendaciones adaptadas a la personalidad, gustos y necesidades de cada cliente.",
    "En The Bull House Barbershop creemos que una buena imagen no solo mejora la apariencia, sino también la seguridad y la confianza con las que enfrentamos cada día. Nuestro objetivo es que salgas de nuestra barbería sintiéndote renovado, seguro y listo para destacar en cualquier ocasión.",
  ],
} as const;

export const navItems = [
  {
    href: "/servicios",
    label: "Servicios",
    subtitle: "Conoce la experiencia",
  },
  {
    href: "/reservas",
    label: "Reservas",
    subtitle: "Vive la experiencia",
  },
  {
    href: "/tienda",
    label: "Tienda",
    subtitle: "A tu estilo",
  },
  {
    href: "/contacto",
    label: "Contáctanos",
  },
  {
    href: "/ubicacion",
    label: "Ubicación",
  },
  {
    href: "/resenas",
    label: "Reseñas",
  },
] as const;
