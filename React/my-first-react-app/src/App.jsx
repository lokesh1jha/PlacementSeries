import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProfileCard from './components/ProfileCard'
import ProductCard from './components/ProductCard'

const users = [
  {
    id: 1,
    name: 'Lokesh Kumar',
    role: 'Full Stack Developer',
    city: 'Hyderabad',
    avatar: 'https://i.pravatar.cc/100?img=1',
    skills: ['React', 'Node', 'JavaScript']
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Frontend Developer',
    city: 'Bangalore',
    avatar: 'https://i.pravatar.cc/100?img=2',
    skills: ['React', 'CSS', 'Figma']
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    role: 'Backend Developer',
    city: 'Mumbai',
    avatar: 'https://i.pravatar.cc/100?img=3',
    skills: ['Node', 'MongoDB', 'Express']
  }
];

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 4999, image: 'https://picsum.photos/seed/kb/400/300', rating: 4.5, inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 1299, image: 'https://picsum.photos/seed/mouse/400/300', rating: 4.2, inStock: true },
  { id: 3, name: 'USB-C Hub', price: 2499, image: 'https://picsum.photos/seed/hub/400/300', rating: 3.8, inStock: false },
  { id: 4, name: 'Monitor Stand', price: 1899, image: 'https://picsum.photos/seed/stand/400/300', rating: 4.7, inStock: true },
];




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World!!!</h1>
      {users.length > 0 ?
        users.map(user => <ProfileCard key={user.id} name={user.name} role={user.role} city={user.city} avatarURL={user.avatar} />)
        :
        <h4>No User Found</h4>
      }

      <div style={{ padding: '32px', background: '#f5f5f5', minHeight: '100vh' }}>
        <h1 style={{ marginBottom: '24px', color: '#1a1a18' }}>Products</h1>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>


          {products.length > 0 ?
            products.map((product) => <ProductCard
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              rating={product.rating}
              inStock={product.inStock} />)
            :
            <h4> No Products Found </h4>
          }
        </div>
      </div>

    </>
  )
}

export default App
