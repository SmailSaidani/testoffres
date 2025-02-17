import { ChevronRight } from '@mui/icons-material';
import Link from 'next/link';

const offers = [
    {
        id: 1,
        title: 'Cyber',
        image: 'https://i.postimg.cc/RhvkM1Qq/2.png',
    },
    {
        id: 2,
        title: 'Assurance mosquées solidaires',
        image: 'https://i.postimg.cc/Hn3fjJBz/3.png',
    },
];

export default function OffersPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Mes offres</h1>
            <ul>
                {offers.map((offer) => (
                    <li key={offer.id} className="mb-4 bg-white   ">
                        <Link href={`offres/${offer.id}`} className="flex items-center p-4 border-b">
                            <img src={offer.image} alt={offer.title} className="w-16 h-16 rounded-lg mr-4" />
                            <div>
                                <h2 className="text-lg font-semibold">{offer.title}</h2>

                            </div>
                            <ChevronRight  className='mx-4 text-xl'/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
