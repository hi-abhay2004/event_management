'use client'
import { useState } from 'react';
import axios from 'axios';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';
const CreateEvent = () => {
    const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = { name, date, location, description };
    // await axios.post('/api/events', event);
    setName('');
    setDate('');
    setLocation('');
    setDescription('');

  };
  console.log("kdjfkdjf",name,date,location,description)
  return (
    <div>
      <Header />
      <main>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Location:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          <button type="submit">Create Event</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;
