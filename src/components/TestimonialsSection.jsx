export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'María García',
      role: 'Dueña de tienda online',
      avatar: 'MG',
      content: 'He reducido el tiempo de creación de contenido para mis redes sociales de horas a minutos. Los diseños quedan increíbles.',
      rating: 5,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Community Manager',
      avatar: 'CM',
      content: 'La mejor herramienta para crear diseños para mis clientes. Fácil de usar y los resultados son profesionales.',
      rating: 5,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Laura Fernández',
      role: 'Emprendedora',
      avatar: 'LF',
      content: 'Mis ventas han aumentado desde que empecé a usar diseños profesionales. Totalmente recomendado.',
      rating: 5,
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Diseños creados' },
    { number: '2,500+', label: 'Usuarios activos' },
    { number: '4.9/5', label: 'Calificación promedio' },
    { number: '50+', label: 'Plantillas disponibles' }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Miles de creadores y emprendedores ya confían en Product Magic Studio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-violet-500 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center font-bold text-white`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-violet-400 mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}