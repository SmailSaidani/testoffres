'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const OfferDetailPage = () => {
  const { offerId } = useParams();
  const router = useRouter();

  // Données à remplacer après l'intégration du backend
  const [offer, setOffer] = useState(null);
  const tabs = ['Couvertures', 'Documents contractuels', 'Documents administratifs', 'Documentation'];
  const [selectedTab, setSelectedTab] = useState('Couvertures');

    useEffect(() => {
        // Fonction pour charger les données de l'offre (simulée ici)
        const loadOffer = async () => {
            // Simuler un appel API avec une promesse
            const fakeOfferData = new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: offerId,
                        title: 'Assurance solidaire & participative multirisques',
                        description:
                            "Ce contrat est un contrat d'assurance de groupe à adhésion individuelle, souscrit par l'Association ARMLC au profit de ses membres (les « Adhérents ») ayant pour objet, moyennant le versement de contributions dans le Fonds des adhérents par les Adhérents, et en cas de réalisation d'un événement couvert...",
                        image: 'https://i.postimg.cc/RhvkM1Qq/2.png',
                        alanOptions: ['Option 1', 'Option 2', 'Option 3'],
                        coverages: [
                            { id: 1, name: 'Esse', description: 'Locus rerum nulla amicitia de diligat semper fiducia circumfluere vita', incluse: true },
                            { id: 2, name: 'Sermo', description: 'Locus rerum nulla amicitia de diligat semper fiducia circumfluere vita', incluse: true },
                            { id: 3, name: 'Imperio', description: 'Locus rerum nulla amicitia de diligat semper fiducia circumfluere vita', franchise: { price: '900€/mois' } },
                            {
                                id: 4, name: 'Tetiam', description: 'Locus rerum nulla amicitia de diligat semper fiducia circumfluere vita', franchise: { price: '500€ + 25%' },
                                options: [
                                    { id: 5, name: 'Option 1', description: 'Locus rerum nulla amicitia de diligat semper fiducia circumfluere vita', price: '50€ par mois' },
                                    { id: 6, name: 'Option 2', description: 'Locus rerum nulla amicitia de diligat semper fiducia circumfluere vita', price: '50€ par mois' },
                                ],
                            },
                        ],
                        responsibleProduct: {
                            name: 'Brahim Mizmani',
                            phone: '01 80 89 30 10',
                            email: 'brahim.mizmani@asekkey.com',
                        },
                    });
                }, 500); // Simuler un délai d'attente de 500ms
            });

            const data = await fakeOfferData; // attendre la fausse API
            setOffer(data); // mettre à jour l'état avec les données reçues
        };

        loadOffer(); // charger l'offre au montage du composant
    }, [offerId]); // relancer si l'ID de l'offre change


  // Configuration des éléments de menu pour les options Alan
  const menuItems = offer?.alanOptions.map((option) => ({
    key: option,
    label: option,
  })) || []; // Assurer un tableau vide si offer est null

  // Configuration des éléments de menu pour les onglets
  const tabMenuItems = tabs.map((tab) => ({
    key: tab,
    label: (
      <span onClick={() => setSelectedTab(tab)}>
        {tab}
      </span>
    ),
  }));

  if (!offer) {
    return <div>Chargement en cours...</div>; // Ou un autre indicateur de chargement
  }

  return (
    <div className="p-4">
      {/* Lien de retour (vue mobile) */}
      <Link href="/dashboard/offers" className="block mb-4 md:hidden">
        &larr; Mes offres
      </Link>

      {/* Détails de l'offre */}
      <div>
        {/* Image et Responsable Produit */}
        <div className="flex justify-between items-start mt-8">
    <img src={offer.image} alt={offer.title} className="rounded-lg w-32" />

    <div className="border border-gray-200 shadow-md rounded-xl p-4 md:w-1/4 hidden md:block">
        <h2 className="text-xl font-semibold mb-2">Responsable produit</h2>
        <p className="text-gray-700">{offer.responsibleProduct.name}</p>
        <div className="flex items-center mt-2">
            <UserIcon className="h-5 w-5 mr-1 text-gray-500" />
            {offer.responsibleProduct.phone}
        </div>
        <div className="flex items-center mt-2">
            <EnvelopeIcon className="h-5 w-5 mr-1 text-gray-500" />
            {offer.responsibleProduct.email}
        </div>
    </div>
</div>


        {/* Titre et Description */}
        <h1 className="text-2xl font-semibold mb-2">{offer.title}</h1>
        <p className="text-gray-600 mb-4">{offer.description}</p>
        <a href="#" className="text-yellow-500 hover:underline block mb-4">
          Voir plus
        </a>

        {/* Bouton Créer un Devis */}
        <button className="bg-yellow-500 hover:bg-yellow-500 text-white font-bold py-2 mb-2 px-4 rounded-lg">Créer un devis</button>

        {/* Dropdown Alan et Onglets */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2 mb-4 border-b pb-2">
          <Dropdown menu={{ items: menuItems }} trigger={["click"]} className='w-48 bg-white border border-gray-300'>
            <button className="relative bg-gray-100 px-4 py-2 rounded-lg flex items-center">
              Alan <DownOutlined className="absolute right-3" />
            </button>
          </Dropdown>
          <div className="flex flex-wrap md:justify-end mt-2 md:mt-0">
            {/* Dropdown pour onglets sur mobile */}
            <Dropdown
              menu={{ items: tabMenuItems }}
              trigger={['click']}
              className="md:hidden w-full mb-2 bg-white border border-gray-300"
            >
              <button className="bg-gray-100 px-4 py-2 rounded-lg flex items-center justify-between w-full">
                {selectedTab}
                <DownOutlined />
              </button>
            </Dropdown>
            {/* Onglets pour la vue desktop */}
            <div className="hidden md:flex flex-wrap md:justify-end">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedTab === tab ? 'bg-gray-200 font-bold' : 'text-gray-500'}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Couvertures */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Couvertures</h2>
          {offer.coverages.map((coverage) => (
            <div key={coverage.id} className="bg-white rounded-lg p-4 mb-2">
              <div className="flex flex-col border border-gray-200 rounded-3xl px-4 p-2 shadow-lg">
                <div className="flex flex-col">
                  <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center'>
                      <ShieldCheckIcon className="h-5 w-5 mr-2" />
                      <h3 className="text-lg font-bold">{coverage.name}</h3>
                    </div>
                    {coverage.incluse && <Badge count="Inclus" showZero color="#faad14" />}
                  </div>
                </div>
                <p className="text-gray-500 mt-2">{coverage.description}</p>
                {coverage.franchise && (
                  <div className="flex flex-row items-center justify-between mt-2 font-bold border-t pt-2">
                    Franchise: <span className="text-gray-700">{coverage.franchise.price}</span>
                  </div>
                )}
                {coverage.options && coverage.options.length > 0 && (
                  <div className="mt-4">
                    {coverage.options.map((option) => (
                      <div key={option.id} className="bg-white rounded-lg p-2 mb-2">
                        <div className="flex flex-col">
                          <div className='flex flex-row items-center justify-between font-bold'>
                            <h3 className="text-lg">{option.name}</h3>
                            <div className="mt-2">
                              <span className="text-gray-700">{option.price}</span>
                            </div>
                          </div>
                          <p className="text-gray-500">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* User responsable - Mobile */}
        <div className="bg-gray-100 rounded-lg p-4 py-2 mt-4 md:hidden">
          <h2 className="text-xl font-semibold mb-2">Responsable produit</h2>
          <p className="text-gray-700">{offer.responsibleProduct.name}</p>
          <div className="flex items-center mt-2">
            <UserIcon className="h-5 w-5 mr-1 text-gray-500" />
            {offer.responsibleProduct.phone}
          </div>
          <div className="flex items-center mt-2">
            <EnvelopeIcon className="h-5 w-5 mr-1 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailPage;
