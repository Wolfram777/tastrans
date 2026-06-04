import Navbar from '../components/Navbar'

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />
      <main className="h-[300vh] bg-gradient-to-b from-white to-gray-100" />
    </div>
  )
}
