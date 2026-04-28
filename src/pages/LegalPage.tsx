export function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions légales</h1>
        <div className="bg-white rounded-2xl p-8 card-shadow border border-gray-100 prose prose-gray max-w-none">
          <h2>Éditeur</h2>
          <p>IA Loire Valley est une plateforme régionale d'orientation et d'information sur l'intelligence artificielle en Centre-Val de Loire.</p>
          <p><strong>Contact :</strong> contact@ialoirevalley.fr</p>

          <h2>Hébergement</h2>
          <p>Ce site est hébergé en France dans le respect du RGPD.</p>

          <h2>Données personnelles</h2>
          <p>Les données collectées via les formulaires sont utilisées uniquement à des fins d'orientation et ne sont pas cédées à des tiers commerciaux.</p>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : contact@ialoirevalley.fr</p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site est protégé. Toute reproduction sans autorisation est interdite.</p>
        </div>
      </div>
    </div>
  )
}
