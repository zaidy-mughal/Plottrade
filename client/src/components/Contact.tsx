import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../redux/user/userSlice';

export interface Listing {
  userRef: string;
  name: string;
  [key: string]: any;
}

interface ContactProps {
  listing: Listing;
}

export default function Contact({ listing }: ContactProps) {
  const [landlord, setLandlord] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${listing.userRef}`);
        const data: User = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows={2}
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}