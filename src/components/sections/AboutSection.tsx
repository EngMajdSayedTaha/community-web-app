// About Section Component
const SOCIAL_LINKS = [
  { name: 'GitHub', icon: '💻', url: 'https://github.com' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { name: 'Discord', icon: '🎮', url: 'https://discord.com' },
];

/**
 * AboutSection - About Majd and the community
 */
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Avatar */}
          <div className="md:col-span-1 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center text-6xl shadow-lg">
              👨‍💻
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Hey, I'm Majd! 👋
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                A passionate full-stack developer and community builder dedicated to helping developers grow and learn together. With over 10 years of experience in web development, I've built everything from small startups to enterprise applications.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                majdst.codes is my way of giving back to the community that shaped my career. Here, we create meaningful learning experiences, share knowledge, and build a supportive ecosystem where developers can thrive.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Projects Built</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mentored Devs</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-6">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary hover:bg-opacity-10 transition-all"
                  title={link.name}
                >
                  <span className="text-xl">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;