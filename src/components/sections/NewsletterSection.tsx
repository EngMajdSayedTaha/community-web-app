// Newsletter Section Component
import Card from '@components/common/Card';
import SubscribeForm from '@features/newsletter/components/SubscribeForm';

/**
 * NewsletterSection - Newsletter subscription CTA section
 */
const NewsletterSection = () => {
  return (
    <section id="newsletter" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-primary from-0% via-yellow-400 via-50% to-primary to-100% bg-opacity-10 border-primary">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated 📬
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get the latest dev cards, challenges, and community updates delivered to your inbox every week.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
            <SubscribeForm />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;