import { FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';

import { programmes } from '../data/programme';

export default function Footer() {
    return (
        <footer className='bg-[#161716d1] -mx-8 -mb-8 h-[30rem] px-16'>
            <div className='flex flex-col'>
                <div className='flex justify-center text-white border-b py-20'>
                    <div className='my-4 tracking-wider'>
                        <h1 className='mb-4 uppercase'>Address</h1>
                        <p className='text-slate-400'>
                            Vähä-hamenkatu 12, 20398
                        </p>
                        <p className='text-slate-400'>Turku, Finland</p>
                    </div>
                    <div className='my-4 ml-20 tracking-wider'>
                        <h1 className='mb-4 uppercase'>Weekly Programmes</h1>
                        <ul>
                            {programmes.map(
                                programme =>
                                    programme.isTakingPlace && (
                                        <li
                                            key={programme.day}
                                            className='mb-4'
                                        >
                                            <p className='my-2'>
                                                {programme.day}
                                            </p>
                                            <small className='text-slate-400'>
                                                {programme.title} {' | '}
                                                <span>
                                                    {programme.startsAt} -{' '}
                                                    {programme.endsAt}
                                                </span>
                                                {' | '} {programme.venue}
                                            </small>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                    <ul className='flex justify-center'>
                        <li>
                            <FaFacebook />
                        </li>
                        <li>
                            <FaXTwitter />
                        </li>
                        <li>
                            <FaInstagram />
                        </li>
                    </ul>
                </div>
            </div>
            <p className='text-center my-6 text-white'>
                <small>&copy; {new Date().getFullYear()} gracechapel.fi</small>
            </p>
        </footer>
    );
}

// import { FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';

// import { programmes } from '../data/programme';

// export default function Footer() {
//     return (
//         <footer className='bg-[#161716d1] -mx-8 -mb-8 h-[30rem] px-16'>
//             <div className='flex justify-center flex-wrap text-white border-b py-20'>
//                 <div className='my-4 tracking-wider'>
//                     <h1 className='mb-4 uppercase'>Address</h1>
//                     <p className='text-slate-400'>Vähä-hamenkatu 12, 20398</p>
//                     <p className='text-slate-400'>Turku, Finland</p>
//                 </div>
//                 <div className='my-4 ml-20 tracking-wider'>
//                     <h1 className='mb-4 uppercase'>Weekly Programmes</h1>
//                     <ul>
//                         {programmes.map(
//                             programme =>
//                                 programme.isTakingPlace && (
//                                     <li key={programme.day} className='mb-4'>
//                                         <p className='my-2'>{programme.day}</p>
//                                         <small className='text-slate-400'>
//                                             {programme.title} {' | '}
//                                             <span>
//                                                 {programme.startsAt} -{' '}
//                                                 {programme.endsAt}
//                                             </span>
//                                             {' | '} {programme.venue}
//                                         </small>
//                                     </li>
//                                 )
//                         )}
//                     </ul>
//                 </div>
//                 <ul className='flex justify-center'>
//                     <li>
//                         <FaFacebook />
//                     </li>
//                     <li>
//                         <FaXTwitter />
//                     </li>
//                     <li>
//                         <FaInstagram />
//                     </li>
//                 </ul>
//             </div>
//             <p className='text-center my-6 text-white'>
//                 <small>&copy; {new Date().getFullYear()} gracechapel.fi</small>
//             </p>
//         </footer>
//     );
// }
