import { Book, Highlight, CulturalEvent, Loan, Reservation, ReadingHistoryItem, CommunityComment } from '../types';

export const BOOKS_DATA: Book[] = [
  {
    id: 'infinito',
    title: 'El infinito en un junco',
    subtitle: 'La invención de los libros en el mundo antiguo',
    author: 'Irene Vallejo',
    publisher: 'Siruela',
    year: 2019,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjLSM2dY-gg3gtIft9L8RH3BTaJ-dGeTe0l6Ow7kVcaOHeGGDKnJaHOd59mVKKVx7vpa7ctV_2VugfYuw7c_THp2xREZtzfs8iHO3M2cW3c2tsGtPYoksRDiQO_nsMAZtP_f4hSqncJFM4xtSe2HY2tISdtvFYJZJJKcasQDVOonAk3cfKwKq_3mCTTwepG5-T_Xy0ABqT_-T7k5TR9zi1gl3HWTtxABCesDfY-RPWfPVCDUp_gmOWDQ',
    category: 'Historia & Ensayo',
    rating: 4.9,
    ratingCount: 1240,
    pages: 452,
    language: 'Español',
    readingTime: '~11 h',
    badges: ['Premio Nacional de Ensayo', 'Best-seller internacional'],
    formats: {
      physical: { available: true, count: 3, shelf: 'Estantería H-14', signatura: '82-4 VAL inf' },
      ebook: { available: true, format: 'EPUB enriquecido con notas', size: '18.4 MB' },
      audio: { available: true, duration: '14h 20m', narrator: 'Irene Vallejo' }
    },
    synopsis: 'Este es un libro sobre la historia de los libros. Un recorrido por la vida de ese fascinante artefacto que inventamos para que las palabras pudieran viajar en el espacio y en el tiempo. La historia de su fabricación, de todos los tipos que hemos ensayado a lo largo de casi treinta siglos: libros de humo, de piedra, de arcilla, de juncos, de seda, de piel, de árboles y, los últimos llegados, de plástico y luz.',
    curatedQuote: '«El libro es un invento tan perfecto como la rueda o la cuchara; nada mejor puede concebirse para su propósito.»',
    branches: [
      { name: 'Sede Central (Palacio de Lectura)', sub: 'Sala de Humanidades • Planta 2', status: 'available', copies: 2 },
      { name: 'Sede Norte (Parque Biblioteca)', sub: 'Préstamo general', status: 'available', copies: 1 },
      { name: 'Sede Histórica (Claustro)', sub: 'En préstamo actualmente', status: 'loaned', copies: 0, availableDate: 'Disp. 18 Oct' }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Beatriz Morales de la Vega',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjBuR6_GZ9gOW629cJQvbquf5xNdM3GFBnfzoSyoqhoCs_ySpceyi-33jbVNDg0gwu40gNddQGA4M-pptzGOY4_IIcwcp7_xLXTrAKgspahXd_uSqMIFPBLhE7aYy9zYD3b0Nebuz7JRGyijfzYJvKKbO74ml7h_EaF1zP6mJGOVngNeOQvpmU5P8V9FZZsy_yip9frDLCzeOKd0OBn4P6T4pXnTod2GYo2Y0fGHBl95FA1syVgrECHQ',
        userTag: 'Lectora ávida',
        timeAgo: 'Hace 3 días',
        rating: 5,
        text: '«Una auténtica carta de amor a los libros. La prosa poética de Irene Vallejo te traslada a los polvorientos caminos de Alejandría y Roma. Indispensable para cualquiera que ame la lectura.»'
      },
      {
        id: 'rev-2',
        userName: 'Rodrigo C. Navarro',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCsyv0YNr-_6EyiuSQpeas1A7b6hktAIfAZ06OBlh9vwcvCwqywWET-UDqf-dvNJPNXP5JJwy92EDk1wNw15jsY0QOyOPSZ8W76SWp3vfMXDJcU8b_vA5RN82bs5NqRIczFaGiQSStbiEfllctHZfIEEg04Np0YWPZpTYiCazSNURyx9B4cXsjiZdg8qnTsJLKgMqly3toUxRgG-b7JvKD44yGGVmvLUoPll2rmFKMQh83JSPz-iuxJQ',
        userTag: 'Club de Clásicos',
        timeAgo: 'Hace 1 semana',
        rating: 5,
        text: '«Rigor filológico combinado con un pulso narrativo vertiginoso. Te hace sentir el peso y la fragilidad del conocimiento humano rescatado de las cenizas.»'
      }
    ]
  },
  {
    id: 'sombra',
    title: 'La sombra del viento',
    subtitle: 'El Cementerio de los Libros Olvidados I',
    author: 'Carlos Ruiz Zafón',
    publisher: 'Planeta',
    year: 2001,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEcWEtQ32n4EdcDwbPeK2AzC1nD17vaeUo0OZPLTHso9EZ8ZcSg1ejloE9mnjEiyQ8iW0PJqQkeHI36oFvQeTt8y1czAUn_ia_n9vFWw8acyEn17bhSeWMG9-KSuVpHE7rjtNlIzw15nv79R6HwQwI0wSEbWuRZXbWfQnNsyTQRz2MIpfQHAwS_Dc2go18BS7Xe94sPLA3WV4KKxzaZ9eNWA1MZqMSuFyryiRyRo__Hi-n-oxN20zfrw',
    category: 'Ficción',
    rating: 4.9,
    ratingCount: 3840,
    pages: 576,
    language: 'Español',
    readingTime: '~14 h',
    badges: ['Clásico Moderno', 'Premio de los Lectores'],
    formats: {
      physical: { available: true, count: 1, shelf: 'Estantería G-08', signatura: '82-3 RUI som' },
      ebook: { available: true, format: 'EPUB', size: '12.1 MB' },
      audio: { available: true, duration: '18h 10m', narrator: 'Jordi Boixaderas' }
    },
    synopsis: 'Un amanecer de 1945, un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: el Cementerio de los Libros Olvidados. Allí, Daniel Sempere encuentra un libro maldito que cambiará el rumbo de su vida y le arrastrará a un laberinto de intrigas y secretos enterrados en el alma oscura de la ciudad.',
    curatedQuote: '«Cada libro, cada tomo que ves, tiene alma. El alma de quien lo escribió, y el alma de quienes lo leyeron y vivieron y soñaron con él.»',
    branches: [
      { name: 'Sede Central (Palacio de Lectura)', sub: 'En préstamo por Elena Morales', status: 'loaned', copies: 0, availableDate: 'Vence 15 Oct' },
      { name: 'Sede Norte (Parque Biblioteca)', sub: 'Sala de Ficción', status: 'available', copies: 1 }
    ],
    reviews: [
      {
        id: 'rev-s1',
        userName: 'Elena Morales Ruiz',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9G0iCCmbuH4Bv7l2oILX24O1dVeeOtJjgtgI50JIcflcb-M1hOH8H_1eM7c-SvObSBj9fFRbxL0E7B7085TYTqUEif7SMU-Yog9R3M550yEhUBwdDscqsi1cENFLcRRFCspYL6ga_tl5UvbxWRn0x0xO3sn2-3xPE4yVLJy7qQHMPA0j-mIJyJxSUk9yz279-sLvB-wdyMTZYfREsn494zoyKktXJbtQ9wPi-IqQz6m6xhgXnR5rELQ',
        userTag: 'Lectora Activa',
        timeAgo: 'Hace 2 días',
        rating: 5,
        text: '«Releyendo por tercera vez en Atenea. La atmósfera gótica de Barcelona y el homenaje a la bibliofilia siguen siendo insuperables.»'
      }
    ]
  },
  {
    id: 'paramo',
    title: 'Pedro Páramo',
    subtitle: 'Edición conmemorativa con notas de autor',
    author: 'Juan Rulfo',
    publisher: 'Fondo de Cultura Económica',
    year: 1955,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjPIeQ1RMKezK6gpntjrVNCPWe5ykCL1zk9uTrjaWlvKebuyWFpK0lEiIgECehTOAp935FilwiGaPj1YRsjE7oBwl1b33nov36M9ClCW5xOtL6CRYzSa0YYrZbDoJQ5VOcmuZgSHh9R3PTH9QVvvqWXlYNshEt4leWybVZNBudtd6oA6499EVlSIZA4Z6Kpf5Vnwq-Q8vPseaDepElW3B0SIpKMWv4FiWR_lA3zHCODa6YzS5V0CacTA',
    category: 'Ficción',
    rating: 4.8,
    ratingCount: 2120,
    pages: 132,
    language: 'Español',
    readingTime: '~4 h',
    badges: ['Club del Mes', 'Obra Cumbre Latinoamericana'],
    formats: {
      physical: { available: true, count: 5, shelf: 'Estantería L-03', signatura: '82-3 RUL ped' },
      ebook: { available: true, format: 'EPUB', size: '5.2 MB' },
      audio: { available: true, duration: '4h 45m', narrator: 'Tenoch Huerta' }
    },
    synopsis: 'Juan Preciado promete a su madre en su lecho de muerte que irá a buscar a su padre, Pedro Páramo, a un pueblo llamado Comala. Al llegar, se encuentra con un pueblo fantasma poblado únicamente por murmullos y espectros errantes atrapados en sus memorias de codicia, culpa y desolación.',
    curatedQuote: '«Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo.»',
    branches: [
      { name: 'Sede Central (Palacio de Lectura)', sub: 'Ejemplares reservados para Club', status: 'available', copies: 4 },
      { name: 'Sede Histórica (Claustro)', sub: 'Colección de Clásicos', status: 'available', copies: 1 }
    ],
    reviews: []
  },
  {
    id: 'soledad',
    title: 'Cien años de soledad',
    subtitle: 'Edición de la Real Academia Española',
    author: 'Gabriel García Márquez',
    publisher: 'Sudamericana',
    year: 1967,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqYoDx3le4P0-tFC9TtpNWynMlqc98y4GRcDIVmTX9hx6DvhQFZUUMY2e9meNyZ_FY-LA7n2wUPmnr1Hu9FIJVCu2hI06y_DCsRiH8zOY2ik5LeEXvaAR4_FEeBjamzIrvKiude8toJQ9FqkOrNAmFB1Mv4VIpqdigAbo5GdTQIL3vG6Cne-ZMND6EuzsnBz8kbnWDdBcnuMQsZNWFi25sipjMazXbmTGpIkM4ltXOZzOh_qtTbhqIJg',
    category: 'Ficción',
    rating: 4.9,
    ratingCount: 5410,
    pages: 471,
    language: 'Español',
    readingTime: '~13 h',
    badges: ['Premio Nobel de Literatura', 'Patrimonio de las Letras'],
    formats: {
      physical: { available: true, count: 4, shelf: 'Estantería L-01', signatura: '82-3 GAR cie' },
      ebook: { available: true, format: 'EPUB', size: '14.5 MB' },
      audio: { available: true, duration: '16h 30m', narrator: 'Víctor Clavijo' }
    },
    synopsis: 'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas.',
    curatedQuote: '«El mundo era tan reciente, que muchas cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo.»',
    branches: [
      { name: 'Sede Central (Palacio de Lectura)', sub: 'Sala de Literatura', status: 'available', copies: 2 }
    ],
    reviews: []
  },
  {
    id: 'ficciones',
    title: 'Ficciones',
    subtitle: 'El jardín de senderos que se bifurcan & Artificios',
    author: 'Jorge Luis Borges',
    publisher: 'Sur',
    year: 1944,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrlxCEGsMDpZQ7A-B73k_XtZlAkfU4mBbyADhtcsbK7EnYJfltxRXDR9F9TCyP5L3yr9JJTCejGVMyFEXjqwmc678WD7CIRLgeHKwekb8JAX5P1-017RxrY0TvTEWZZ-yWCwpKSXkDKc5kYls_10R8tVoz1WFLR2_HLVDcWriqmD0IphhrsDXF1c4py-vmZVDMQxw_mEQCfwt-F_BG4KH8pP3KyIweO5UAjlE-gYGXftfDIEE1YwgUuw',
    category: 'Ficción',
    rating: 4.8,
    ratingCount: 1980,
    pages: 214,
    language: 'Español',
    readingTime: '~6 h',
    badges: ['Laberintos & Espejos', 'Filosofía Literaria'],
    formats: {
      physical: { available: false, count: 0, shelf: 'Estantería B-04', signatura: '82-3 BOR fic' },
      ebook: { available: true, format: 'EPUB', size: '4.8 MB' },
      audio: { available: false, duration: '', narrator: '' }
    },
    synopsis: 'Colección fundamental de relatos donde laberintos infinitos, bibliotecas cósmicas, enciclopedias apócrifas y detectives metafísicos desafían los límites del tiempo y la razón humana.',
    curatedQuote: '«Siempre imaginé que el Paraíso sería algún tipo de biblioteca.»',
    branches: [
      { name: 'Sede Central', sub: 'Reservado por Elena Morales (Turno #1)', status: 'loaned', copies: 0, availableDate: 'Recogida Mañana' }
    ],
    reviews: []
  },
  {
    id: 'sapiens',
    title: 'Sapiens: De animales a dioses',
    subtitle: 'Breve historia de la humanidad',
    author: 'Yuval Noah Harari',
    publisher: 'Debate',
    year: 2014,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC9nj7kG7KKPTd0r1zXhuR5kRTFiVuBn1Vy3Hql2x71adZllAVH5iebhw_H4uk11D-WEFyGfKbRaytiZXOWW7hJP-tKCU_dEcq9aaOkAi5ey72h5RR6vox3jSLBbM_KuilO8YVBePHAiqfV0O_HFDuCHRbqVrb85UfCDXagK3WyoCL_dYr8RU3I_5G0e583_OqbOrA2HH8VM1iQHZAyPLnefuQFtgRmYhaPpepgXD0pCF_3Zkk2KImMA',
    category: 'Historia & Ensayo',
    rating: 4.7,
    ratingCount: 3100,
    pages: 496,
    language: 'Español',
    readingTime: '~12 h',
    badges: ['Divulgación Científica', 'Impacto Global'],
    formats: {
      physical: { available: true, count: 2, shelf: 'Estantería S-02', signatura: '93 HAR sap' },
      ebook: { available: true, format: 'EPUB', size: '16.2 MB' },
      audio: { available: true, duration: '15h 15m', narrator: 'Jordi Boixaderas' }
    },
    synopsis: 'Hace 100.000 años al menos seis especies de humanos habitaban la Tierra. Hoy solo queda una: Homo sapiens. ¿Cómo logró nuestra especie imponerse y crear imperios, religiones y dinero?',
    curatedQuote: '«No hay dioses en el universo, ni naciones, ni dinero, ni derechos humanos, salvo en la imaginación común de los seres humanos.»',
    branches: [
      { name: 'Sede Central', sub: 'En préstamo por Elena Morales', status: 'loaned', copies: 1, availableDate: 'Vence 28 Oct' }
    ],
    reviews: []
  },
  {
    id: 'klara',
    title: 'Klara y el sol',
    subtitle: 'Novela',
    author: 'Kazuo Ishiguro',
    publisher: 'Anagrama',
    year: 2021,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMrFAyEGnn1pLxH7VqWSHkt4fl-5sBRGHgq8V5cEt7m2PQagelV4pFO9M7wleqV6GHsdi1YqgTDla60ZF66cpMmVXbVIq3opJ4rYBX8axpVB9eGfAVUN-8bRsDZ-GgRWRLpk3I5-D64YGtkcoqsC6_VeAhlpFYboFJgS2zrEbFuGdroKfNVLNUpbV_lVi4n1q6cuHtyF-R7rxiR0R0RKFRz3QhBcDX1gVSaK29h8QMPCTgmDGjMKFGaw',
    category: 'Ficción',
    rating: 4.7,
    ratingCount: 1650,
    pages: 384,
    language: 'Español',
    readingTime: '~9 h',
    badges: ['Audiolibro Destacado', 'Premio Nobel'],
    formats: {
      physical: { available: true, count: 1, shelf: 'Estantería I-02', signatura: '82-3 ISH kla' },
      ebook: { available: true, format: 'EPUB', size: '7.8 MB' },
      audio: { available: true, duration: '10h 25m', narrator: 'Nuria Mediavilla' }
    },
    synopsis: 'Klara es una Amiga Artificial especializada en el cuidado de niños. Desde el escaparate de la tienda observa con atención el comportamiento de los transeúntes y espera ser elegida mientras contempla el poder nutricio del sol.',
    branches: [],
    reviews: []
  },
  {
    id: 'angel',
    title: 'El juego del ángel',
    subtitle: 'El Cementerio de los Libros Olvidados II',
    author: 'Carlos Ruiz Zafón',
    publisher: 'Planeta',
    year: 2008,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRiBtSmEryuiIawbXa_TmuC8GKD_ba6PX_9oz41hSsklL-Ru9CqfAxnc6_tyjcTBf10g2QNeMQPlBbAmDCohzbgvz4qT9YqlSs-UbD-D7lcmTVydApq1xYKP0756ibb2vXkw0ZTlyKnx_cnk26Y3L5IenblAE_98-J9QMdcVi_7MObIz7k96ZR8tJKlKHRj9c6Zp4eZTJWl1G-UVXSqWR_Q2UbRuv75tn2gvA3ZQ9nqhBljmBr39saTw',
    category: 'Ficción',
    rating: 4.7,
    ratingCount: 1890,
    pages: 672,
    language: 'Español',
    readingTime: '~16 h',
    badges: ['Misterio Histórico', 'Saga Zafón'],
    formats: {
      physical: { available: true, count: 2, shelf: 'Biblioteca Central • Estante B-12', signatura: '82-3 RUI jue' },
      ebook: { available: true, format: 'EPUB', size: '13.8 MB' },
      audio: { available: true, duration: '19h 40m', narrator: 'Jordi Boixaderas' }
    },
    synopsis: 'En la turbulenta Barcelona de los años 20, un joven escritor obsesionado con un amor imposible recibe la oferta de un misterioso editor para escribir un libro como no ha existido nunca a cambio de una fortuna.',
    branches: [],
    reviews: []
  },
  {
    id: 'rosa',
    title: 'El nombre de la rosa',
    subtitle: 'Edición crítica con apostillas del autor',
    author: 'Umberto Eco',
    publisher: 'Lumen',
    year: 1980,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIpFosNvJW5EKYNUqjuY9nDlCI2AyiK89O8PuWw2PcO9hsvGQKVp72RQ3RDmUW9Av40nARpfVXsf7Ir2ka7CvIadzQhVo3e3Jzk4RWubHvEhUbXn83j7ZQAAOUu8F5phPpBvJZBWyZSzBgQWlp9xhZOu4Qfp9nZyc_rizkrJnxVzwEgZLxddam16ofTzUe0SWt0CGkUogcw2zJM7gxm3YHoH8T9D8vztx2UfyaH4mDNwsZDCeLXzMzXg',
    category: 'Historia & Ensayo',
    rating: 4.9,
    ratingCount: 3420,
    pages: 592,
    language: 'Español',
    readingTime: '~15 h',
    badges: ['eBook Inmediato', 'Clásico Medieval'],
    formats: {
      physical: { available: true, count: 1, shelf: 'Estantería E-06', signatura: '82-3 ECO nom' },
      ebook: { available: true, format: 'EPUB / Kindle', size: '11.5 MB' },
      audio: { available: true, duration: '20h 10m', narrator: 'Juan Magraner' }
    },
    synopsis: 'Invierno de 1327. El franciscano Guillermo de Baskerville llega a una remota abadía en los Alpes italianos célebre por su biblioteca inaccesible para investigar una serie de muertes enigmáticas entre los monjes copistas.',
    branches: [],
    reviews: []
  },
  {
    id: 'dumas',
    title: 'El club Dumas',
    subtitle: 'O la sombra de Richelieu',
    author: 'Arturo Pérez-Reverte',
    publisher: 'Alfaguara',
    year: 1993,
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPZVR6OzV2IPXSWxi-KoIliIqzg45aUpSfT5ivGprtlV95mMDPF4W9-jJvqO7kwprucP3jBgcdz1QLL153IYknj7WHMUGF-CkQTNunxex14loo4ksQl0MfBXdeQRDqOH9KgN7VnQCRsDWBihNt8MtbyllnbJC6nEpnrmGJDRqdh2k_j6dPAdqZBD-FW1RXEwZFoqzDQ8iYxPh5RW4BXar6jKnsGvawfXleRE-3zrhdZUvMvEpvLtEj5A',
    category: 'Ficción',
    rating: 4.6,
    ratingCount: 1410,
    pages: 448,
    language: 'Español',
    readingTime: '~11 h',
    badges: ['Ficción Literaria', '1 en espera'],
    formats: {
      physical: { available: false, count: 0, shelf: 'Estantería P-10', signatura: '82-3 PER clu' },
      ebook: { available: true, format: 'EPUB', size: '8.4 MB' },
      audio: { available: false, duration: '', narrator: '' }
    },
    synopsis: 'Lucas Corso, mercenario de la bibliofilia y cazador de libros raros por encargo, debe autenticar un manuscrito inédito de Los tres mosqueteros y descifrar el secreto de Las Nueve Puertas del Reino de las Sombras.',
    branches: [],
    reviews: []
  }
];

export const HIGHLIGHTS_DATA: Highlight[] = [
  {
    id: 'high-1',
    bookId: 'infinito',
    bookTitle: 'El infinito en un junco',
    chapter: 'Cap. III, pág. 142',
    page: 142,
    quote: '«Al principio fueron las palabras habladas, el aire que temblaba y se desvanecía; luego vino el junco que brotaba en las marismas del Nilo, aplastado y trenzado para atrapar el suspiro humano en una superficie tangible.»',
    note: 'Este pasaje encapsula la transición de la oralidad a la permanencia física de la escritura. Conectar con el debate del Club sobre el rol de la biblioteca de Alejandría.',
    noteType: 'marginal',
    noteTitle: 'Nota Marginal',
    color: 'terracotta',
    colorLabel: 'Cita Memorable',
    date: 'Ayer, 22:15',
    clubName: 'Club de Clásicos Nocturnos',
    clubMatches: 234,
    isPrivate: false,
    tags: ['#Oralidad', '#Historia del Libro', '#Alejandría'],
    likes: 86,
    commentsCount: 19
  },
  {
    id: 'high-2',
    bookId: 'sombra',
    bookTitle: 'La sombra del viento',
    chapter: 'Pág. 89',
    page: 89,
    quote: '«Cada libro, cada tomo que ves, tiene alma. El alma de quien lo escribió, y el alma de quienes lo leyeron y vivieron y soñaron con él.»',
    note: 'La idea de los libros como depósitos de memoria viva. Excelente para el ensayo mensual sobre literatura circular y palimpsestos.',
    noteType: 'hipotesis',
    noteTitle: 'Hipótesis para Ensayo',
    color: 'parchment',
    colorLabel: 'Idea Clave',
    date: '12 Oct, 18:40',
    isPrivate: false,
    tags: ['#Memoria', '#Bibliofilia'],
    likes: 45,
    commentsCount: 8
  },
  {
    id: 'high-3',
    bookId: 'paramo',
    bookTitle: 'Pedro Páramo',
    chapter: 'Pág. 34',
    page: 34,
    quote: '«Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo.»',
    note: 'El descenso al inframundo en apenas una línea. La voz de Juan Preciado cargada de una resignación casi fúnebre desde el inicio.',
    noteType: 'marginal',
    noteTitle: 'Anotación personal',
    color: 'sage',
    colorLabel: 'Vocabulario / Estilo',
    date: '8 Oct, 14:10',
    isPrivate: true,
    tags: ['#RealismoMágico', '#Comala'],
    likes: 12,
    commentsCount: 2
  }
];

export const COMMUNITY_COMMENTS: CommunityComment[] = [
  {
    id: 'comm-1',
    userName: 'Elena Morales',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9G0iCCmbuH4Bv7l2oILX24O1dVeeOtJjgtgI50JIcflcb-M1hOH8H_1eM7c-SvObSBj9fFRbxL0E7B7085TYTqUEif7SMU-Yog9R3M550yEhUBwdDscqsi1cENFLcRRFCspYL6ga_tl5UvbxWRn0x0xO3sn2-3xPE4yVLJy7qQHMPA0j-mIJyJxSUk9yz279-sLvB-wdyMTZYfREsn494zoyKktXJbtQ9wPi-IqQz6m6xhgXnR5rELQ',
    userBadge: 'Lectora Activa',
    timeAgo: 'Hace 2 horas',
    content: 'Lo impresionante es cómo describe la fragilidad del soporte físico frente a la ambición de inmortalizar la voz humana. Toda civilización se sostiene apenas sobre juncos secos.',
    likes: 14,
    clubAffiliation: 'Atenea Clásicos'
  },
  {
    id: 'comm-2',
    userName: 'Prof. Mario Valenzuela',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWKlS7DT-L1eoMd5xlVbz_wsgUmI2-MMhsDzjdBvIfnkcsWDgPuTytEXHYimIXDvDtpKhJiQOkwtbHcLdEm5KCU2qUApyjujoekMe0NSOXPwTTQJIgTWeSX8mRH-nNrM6Khlv9ZZxWjlxh5K7FuoJjwPV9QTI75z244d7z58jbrZF8YXmfhoZmqMHN4_-Aquqy8aVtBd49gUibKJ_cbmYi2dCvvH7r_IjSpk0wxRZdQMjXWK3nNkwOcg',
    userBadge: 'Moderador',
    timeAgo: 'Hace 5 horas',
    content: 'Un recordatorio perfecto para la sesión del jueves: ¿es el soporte digital el nuevo papiro o el fuego de Alejandría? La memoria nunca ha sido enteramente incorpórea.',
    likes: 28,
    clubAffiliation: 'Círculo de Alejandría'
  },
  {
    id: 'comm-3',
    userName: 'Rodrigo Navarro',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8blW2PqnMHwd457yLpLCfdqDFVWTiPeZpBmLtkA7GFaISN2K30OzjryEnSzcX-SDWGS4RlhcV78RFhp8aHBDD-MBuTWmIK9wV2B1uXDOsCYNa6QPnntUHvdT0OyoCGZEWeTaQhrycR4unV0fHgjiUQSonXvtPFE9qRVL_C-dg_EvmsUHD1YouyMa55UdkT14tY_Y6u5M5T6P2he_NtVAmkER4_BBqK18QX1g0BSOcLfN8LXUDG6QhRg',
    timeAgo: 'Ayer • 21:40',
    content: 'La metáfora del junco aplastado es sencillamente poética. Subrayé este mismo pasaje hace dos veranos y volver a encontrarlo aquí conmueve igual.',
    likes: 6
  }
];

export const CULTURAL_EVENTS: CulturalEvent[] = [
  {
    id: 'event-rulfo',
    title: 'Pedro Páramo',
    subtitle: 'Juan Rulfo • Moderado por Prof. Mario Valenzuela',
    category: 'club',
    dateDisplay: {
      dayOfWeek: 'JUE',
      dayNumber: 17,
      time: '18:30h'
    },
    badge: 'Quedan 4 plazas',
    location: 'Sala Polivalente & Google Meet',
    isFeatured: true,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjPIeQ1RMKezK6gpntjrVNCPWe5ykCL1zk9uTrjaWlvKebuyWFpK0lEiIgECehTOAp935FilwiGaPj1YRsjE7oBwl1b33nov36M9ClCW5xOtL6CRYzSa0YYrZbDoJQ5VOcmuZgSHh9R3PTH9QVvvqWXlYNshEt4leWybVZNBudtd6oA6499EVlSIZA4Z6Kpf5Vnwq-Q8vPseaDepElW3B0SIpKMWv4FiWR_lA3zHCODa6YzS5V0CacTA',
    moderator: {
      name: 'Prof. Mario Valenzuela',
      role: 'Moderador residente',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBUMFR8aag3_MGgtyXIp8iBleprysA2oiek5paWG2H6iAnxkjQSKFHvBSqQBWED2SlfLIq9POJMiTKshRk0w1wUug5WZ85TDoo4oazO0KaUoEyo8Fc0VE4eQ1bmKFo-awtPOt35H628DJsnsfQRBmVGEQuL1zDajma8tU1MuNzyM5A3C_WwEhMHGMV9QfJBfjlznGFsFFSJDVTibFv2i1jW0x4qyXmMMYnsODk6JN6FJhRbP9VWGRshQ'
    },
    enrolledCount: 24,
    maxSpots: 28,
    userEnrolled: false
  },
  {
    id: 'event-encuadernacion',
    title: 'Taller de Encuadernación Artesanal Japonesa',
    subtitle: 'Aprende costura Yotsume Toji. Incluye papel washi y herramientas.',
    category: 'taller',
    dateDisplay: {
      dayOfWeek: 'SÁB',
      dayNumber: 19,
      time: '11:00h'
    },
    badge: 'Presencial · Cupos limitados',
    location: 'Taller de Restauración • Planta 1',
    enrolledCount: 12,
    maxSpots: 15
  },
  {
    id: 'event-fantasia',
    title: 'Literatura fantástica contemporánea',
    subtitle: 'Debate abierto con 3 autores invitados y sesión de firmas.',
    category: 'mesa_redonda',
    dateDisplay: {
      dayOfWeek: 'MIÉ',
      dayNumber: 23,
      time: '19:00h'
    },
    badge: 'Mesa Redonda · Auditorio Mayor',
    location: 'Auditorio Mayor Atenea',
    guests: [
      {
        name: 'Clara Ortiz',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANyEPs91hJgipL0QA2pIwURXzGuIpKLpUGo6HpBAT5ZpMVLxZC9pY0B7S4lMWvE2EeBzlkguJ1KaRzl8iZXnu2lmCQ31I86NTzeL4K9qhC_eH8xaOGWm8bbQCOoO-FJOdZoiEWNixUSaCJLGq0xklSL2V2KrfKsEv7eY9dx1WUUNPeGNiuJBIHzR3VyRaMgqhTCnIbvs003-bKTreesER1C9RxJXE3sYp8PF1UDc-07ERPgIe0whCo8g'
      },
      {
        name: 'Diego Mendez',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT4muGFmk9otVKRAmrp8tkUvRI3sLxglLOQ-9M1XQOrS6gYbGaBj7GoMhzUPoCogMg3pJNO205Z3DkDlf0pjkrqTWWQeqUh8u86OfldU7qSRPVt5FcCSXHupEF0qiqwpcSZQTM05Wla4-v7WQL3Sl79X8btYUlL4HzAiBcAmQw1L6DBrS4t8hnD7wjH8miC8L303i98HlZzQ7SwxqO6WQvxL9AxO-T__A63fA4DfVYCZBqFVbs_ns6xA'
      },
      {
        name: 'Sofia Leiva',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE85tZ9aHUEIuSqiM8fQJQQjaQC5shAoqeNXUqu8Q_ehA7RSQAoq_MfNgt1RQWoRwLZkLyLtvIwi_UsvZLKQmsX6Hnik7NOssC6d2Bqw9lIa63BMFlCxKflQxqTRPk6Rwr_il633WU3y2kIkYXttZxZ9ovRFdG75zWlNITWbCmYZmR2dvevS1AAC1yqx3TmwlTAnvLRjiO7oKoj2-0BY-E6-J0Zy4GjXZHmJEN74L_F1ZTy1ZoeCdvuQ'
      }
    ],
    enrolledCount: 68
  },
  {
    id: 'event-cuento',
    title: 'La Hora del Cuento: Fábulas mitológicas',
    subtitle: 'Narración oral teatralizada con títeres de sombras y títeres de dedos.',
    category: 'infantil',
    dateDisplay: {
      dayOfWeek: 'DOM',
      dayNumber: 27,
      time: '12:00h'
    },
    badge: 'Familiar · 4 a 9 años',
    location: 'Rincón del Cuento infantil',
    enrolledCount: 30
  }
];

export const ACTIVE_LOANS: Loan[] = [
  {
    id: 'loan-1',
    bookId: 'sombra',
    title: 'La sombra del viento',
    author: 'Carlos Ruiz Zafón',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEcWEtQ32n4EdcDwbPeK2AzC1nD17vaeUo0OZPLTHso9EZ8ZcSg1ejloE9mnjEiyQ8iW0PJqQkeHI36oFvQeTt8y1czAUn_ia_n9vFWw8acyEn17bhSeWMG9-KSuVpHE7rjtNlIzw15nv79R6HwQwI0wSEbWuRZXbWfQnNsyTQRz2MIpfQHAwS_Dc2go18BS7Xe94sPLA3WV4KKxzaZ9eNWA1MZqMSuFyryiRyRo__Hi-n-oxN20zfrw',
    format: 'Físico',
    dueDate: '15 de Octubre',
    daysRemaining: 3,
    totalDays: 21,
    currentDay: 18,
    renewable: true,
    renewedCount: 0,
    location: 'Copia física'
  },
  {
    id: 'loan-2',
    bookId: 'sapiens',
    title: 'Sapiens: De animales a dioses',
    author: 'Yuval Noah Harari',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC9nj7kG7KKPTd0r1zXhuR5kRTFiVuBn1Vy3Hql2x71adZllAVH5iebhw_H4uk11D-WEFyGfKbRaytiZXOWW7hJP-tKCU_dEcq9aaOkAi5ey72h5RR6vox3jSLBbM_KuilO8YVBePHAiqfV0O_HFDuCHRbqVrb85UfCDXagK3WyoCL_dYr8RU3I_5G0e583_OqbOrA2HH8VM1iQHZAyPLnefuQFtgRmYhaPpepgXD0pCF_3Zkk2KImMA',
    format: 'Físico',
    dueDate: '28 de Octubre (16 días)',
    daysRemaining: 16,
    totalDays: 25,
    currentDay: 9,
    renewable: true,
    renewedCount: 0,
    location: 'Sala Central (Est. 4B)'
  }
];

export const RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    bookId: 'ficciones',
    title: 'Ficciones',
    author: 'Jorge Luis Borges',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDal77OAJHAdASOXfYV0HXM2aWkL3-8d-qkFIJVQltv0pJGRXqMkx3ekPRz165_zDJehwmaXe1z5_If5F_O2zQpgohzRlo8gB2Xg1gPhS_AIVdkyHVtxTGm7VvsXuPLn3STvfluqLURGolSZ1wUoWBO42-YE2VuHR7ai_hbsRRP2jjJSe0h7IGYujMRGuNNgGiTDOy1cfwA7t9zPnJsPSmlvx-4QaXgH1aP6Fjo_mXCaroT9l_pmVV7Ag',
    queuePosition: 1,
    readyDate: 'Mañana',
    pickupLocation: 'Claustro Mayor · Taquilla 14'
  }
];

export const READING_HISTORY: ReadingHistoryItem[] = [
  {
    id: 'hist-1',
    bookId: 'soledad',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDh-3Lj3FLJVbVeuaddIyQCfEc59HwYvDnrtWAEOoUwkwrBKeV0SSZPUvJnOmnlrloqXiEgoCquSP3qFxrUrdiF2HXIJ43Lv334OSH32DteuvPYObTCB4uVhe3J0yCHWW0dXxXndjnywHa1XYMFBf2uSABMPaFn7vr_yBjbo30n4muNzzPNRm2eLrNbUPU5JQSDSmi9iNzxFN-eAYyiJzXsq-iSV2R2vFY3GbDYO8kcwd_tGbtROQE1Q',
    returnedDate: 'Devuelto el 28 Sep',
    userRating: 5
  },
  {
    id: 'hist-2',
    bookId: 'rosa',
    title: 'El nombre de la rosa',
    author: 'Umberto Eco',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6yI_mFggHtgQJroZ2JVmsLLOrtKARnm8ak5GT0Ru8xzGs2f3IwbyccxAYr5Hj71Hq6BYr-1nx4dcXsoC9eflTrg4PKk8EO3WqxpODATTcICaFqbiWizB6e6VKDAkXMlZk3iyU9j72y3-9c1YwkOqWh9EcM2wproDZCupP4COHBsKl57KoG7G4ASIMbAfXRLSNW6bjLldJodzpYuG0NF6Z5qySJAmAc4ZAKDRbpwhWTx_uiomazCUR6Q',
    returnedDate: 'Devuelto el 10 Sep',
    userRating: 4
  }
];

export const MEMBER_PROFILE = {
  name: 'Elena Morales Ruiz',
  membershipNumber: 'AT-8942-B',
  validUntil: '12 / 2026',
  tier: 'Frecuente',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRlFJo1wOfwHm6Ob6RmV5YgQ5n6TDJQs41nVm-I1uRy24HWPh5CkrdsGZ71dnRWV2yb3VxnCayM90IvfX97JsMpDKyynEb_qGLcfWQx90GCwmDqJ3odRKcQSvQfKkvyTrScOTJoft8vf-amtzS78G1O3IFrbrFVq293Df8_35gvmiUDfhSFRP6-6yVNKMcqGcQvQQgLPcRw8g0ky5Pzwtu0M8UqrC5W4BKKtPoMnh182gt_fsQ0pRWog',
  activeLoansCount: 2,
  reservationsCount: 1,
  readThisYear: 24,
  yearlyGoal: 25,
  joinedDate: 'Marzo 2022',
  favoriteGenre: 'Ensayo & Novela Histórica',
  bio: 'Lectora voraz de ensayos clásicos, arqueología del libro y ficción gótica.',
  badgesEarned: [
    { title: 'Bibliófilo Nocturno', desc: 'Más de 50 horas de lectura pasadas las 22:00', icon: 'nights_stay' },
    { title: 'Crítico de Círculo', desc: 'Participó en 12 debates de club literario', icon: 'auto_stories' },
    { title: 'Custodio del Papiro', desc: 'Subrayó más de 30 pasajes comentados', icon: 'history_edu' }
  ]
};

// Convenient aliases for consistent imports across screens
export const mockBooks = BOOKS_DATA;
export const initialHighlights = HIGHLIGHTS_DATA;
export const initialLoans = ACTIVE_LOANS;
export const initialReservations = RESERVATIONS;
export const initialHistory = READING_HISTORY;
export const readerProfile = MEMBER_PROFILE;
export const initialCulturalEvents = CULTURAL_EVENTS;
