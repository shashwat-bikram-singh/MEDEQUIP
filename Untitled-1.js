import { useState } from "react";
import { ShoppingCart, Search, User, Package, BarChart3, Truck, LogIn, Home as HomeIcon, Moon, Sun, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const seedProducts = [
  { id: 1, name: "Surgical Face Mask", price: 5, badge: "New", stock: 120, specs: "3-ply, disposable, box of 50" },
  { id: 2, name: "Latex Gloves Box", price: 12, badge: "Low Stock", stock: 15, specs: "Powder-free, box of 100" },
  { id: 3, name: "Digital Thermometer", price: 20, badge: "", stock: 80, specs: "Fast read, ±0.1°C accuracy" },
  { id: 4, name: "BP Monitor", price: 55, badge: "Out of Stock", stock: 0, specs: "Upper arm, LCD display" },
  { id: 5, name: "Oxygen Mask", price: 8, badge: "", stock: 60, specs: "Adult size, medical grade" },
  { id: 6, name: "Pulse Oximeter", price: 25, badge: "Bestseller", stock: 140, specs: "SpO2 & Pulse" },
];

function Navbar({ setRoute, cartCount, dark, setDark }) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-3">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-2" onClick={() => setRoute({ name: "home" })}>
          <HomeIcon className="w-5 h-5" /> MEDEQUIP
        </div>
        <div className="hidden md:flex items-center gap-2 flex-1 mx-6">
          <div className="flex items-center w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input className="bg-transparent outline-none px-2 w-full" placeholder="Search masks, gloves, BP machines..." />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setRoute({ name: "products" })}>Products</Button>
          <Button variant="ghost" onClick={() => setRoute({ name: "tracking" })}>Track</Button>
          <Button variant="ghost" onClick={() => setRoute({ name: "admin" })}>Admin</Button>
          <Button variant="ghost" onClick={() => setRoute({ name: "login" })}><LogIn className="w-5 h-5" /></Button>
          <Button variant="ghost" onClick={() => setDark(!dark)}>{dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</Button>
          <Button variant="outline" onClick={() => setRoute({ name: "cart" })} className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (<span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>)}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Footer({ setRoute }) {
  return (
    <div className="border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">MEDEQUIP</div>
          <p className="text-slate-500">Trusted medical equipment for hospitals and pharmacies.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1">
            <li className="cursor-pointer" onClick={() => setRoute({ name: "about" })}>About</li>
            <li className="cursor-pointer" onClick={() => setRoute({ name: "contact" })}>Contact</li>
            <li className="cursor-pointer" onClick={() => setRoute({ name: "faq" })}>FAQ</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Policies</div>
          <ul className="space-y-1">
            <li className="cursor-pointer" onClick={() => setRoute({ name: "policies" })}>Privacy</li>
            <li className="cursor-pointer" onClick={() => setRoute({ name: "policies" })}>Returns</li>
            <li className="cursor-pointer" onClick={() => setRoute({ name: "policies" })}>Terms</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <p className="text-slate-500">support@medequip.com</p>
        </div>
      </div>
    </div>
  );
}

function Home({ setRoute }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-10 mb-10">
        <h1 className="text-4xl font-bold mb-4">Trusted Medical Equipment for Professionals</h1>
        <p className="mb-6 text-slate-600 dark:text-slate-300">Hospital-grade supplies. Fast delivery. Secure payments.</p>
        <Button onClick={() => setRoute({ name: "products" })} className="rounded-xl">Browse Products</Button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {["Masks", "Gloves", "Thermometers", "BP Machines", "Oxygen", "Diagnostics", "PPE", "More"].map((c) => (
          <Card key={c} className="hover:shadow-lg transition rounded-2xl cursor-pointer">
            <CardContent className="p-6 text-center font-medium">{c}</CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {seedProducts.slice(0,4).map((p) => (
          <Card key={p.id} className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-4">
              <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3"></div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-blue-600 font-bold">${p.price}</div>
              <Button className="mt-3 w-full rounded-xl" onClick={() => setRoute({ name: "product", id: p.id })}>View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Products({ products, addToCart, setRoute }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="rounded-2xl">
            <CardContent className="p-4">
              <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="font-semibold">{p.name}</div>
                {p.badge && (<span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">{p.badge}</span>)}
              </div>
              <div className="text-blue-600 font-bold">${p.price}</div>
              <div className="flex gap-2 mt-3">
                <Button className="w-full rounded-xl" onClick={() => setRoute({ name: "product", id: p.id })}>Details</Button>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => addToCart(p)}>Add</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ product, addToCart }) {
  if (!product) return null;
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-blue-600 text-2xl font-bold mb-2">${product.price}</div>
        <div className="mb-2">Stock: {product.stock}</div>
        <p className="mb-4 text-slate-600 dark:text-slate-300">{product.specs}</p>
        <div className="flex gap-3">
          <Button className="rounded-xl" onClick={() => addToCart(product)}>Add to Cart</Button>
          <Button variant="outline" className="rounded-xl">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, setRoute }) {
  const total = cart.reduce((s, i) => s + i.price, 0);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 && <p className="text-slate-500">Cart is empty.</p>}
      {cart.map((item, idx) => (
        <Card key={idx} className="mb-3 rounded-2xl"><CardContent className="p-4 flex justify-between"><div>{item.name}</div><div className="font-bold">${item.price}</div></CardContent></Card>
      ))}
      <div className="mt-6 text-right">
        <div className="text-xl font-semibold">Total: ${total}</div>
        <Button className="mt-3 rounded-xl" onClick={() => setRoute({ name: "checkout" })}>Proceed to Checkout</Button>
      </div>
    </div>
  );
}

function Checkout({ onPlace }) {
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="rounded-2xl"><CardContent className="p-6"><h2 className="font-semibold mb-4">Shipping Details</h2><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-3" placeholder="Full Name" /><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-3" placeholder="Address" /><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800" placeholder="Phone" /></CardContent></Card>
      <Card className="rounded-2xl"><CardContent className="p-6"><h2 className="font-semibold mb-4">Payment</h2><div className="space-y-2"><Button className="w-full rounded-xl" onClick={onPlace}>Pay with Card</Button><Button variant="outline" className="w-full rounded-xl">Pay with eSewa</Button><Button variant="outline" className="w-full rounded-xl">Pay with Khalti</Button></div></CardContent></Card>
    </div>
  );
}

function Login({ setRoute }) {
  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="rounded-2xl"><CardContent className="p-6"><h1 className="text-2xl font-bold mb-4">Login</h1><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-3" placeholder="Email" /><input type="password" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-4" placeholder="Password" /><Button className="w-full rounded-xl mb-3">Login</Button><Button variant="outline" className="w-full rounded-xl" onClick={() => setRoute({ name: "register" })}>Create Account</Button></CardContent></Card>
    </div>
  );
}

function Register({ setRoute }) {
  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="rounded-2xl"><CardContent className="p-6"><h1 className="text-2xl font-bold mb-4">Register</h1><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-3" placeholder="Name" /><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-3" placeholder="Email" /><input type="password" className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-4" placeholder="Password" /><Button className="w-full rounded-xl" onClick={() => setRoute({ name: "login" })}>Create Account</Button></CardContent></Card>
    </div>
  );
}

function Profile({ orders }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <Card className="rounded-2xl mb-6"><CardContent className="p-6">Profile info (name, email, addresses)</CardContent></Card>
      <h2 className="text-xl font-semibold mb-2">Order History</h2>
      <Card className="rounded-2xl"><CardContent className="p-6"><table className="w-full text-left"><thead><tr><th>ID</th><th>Date</th><th>Status</th><th>Total</th></tr></thead><tbody>{orders.map(o => (<tr key={o.id}><td>#{o.id}</td><td>{o.date}</td><td>{o.status}</td><td>${o.total}</td></tr>))}</tbody></table></CardContent></Card>
    </div>
  );
}

function Tracking() {
  return (
    <div className="max-w-3xl mx-auto p-6"><h1 className="text-3xl font-bold mb-4">Order Tracking</h1><input className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 mb-4" placeholder="Enter Order ID" /><Card className="rounded-2xl"><CardContent className="p-6">Status timeline: Confirmed → Packed → Shipped → Delivered</CardContent></Card></div>
  );
}

function Admin({ products, setProducts, orders, users }) {
  const addProduct = () => setProducts([...products, { id: Date.now(), name: "New Item", price: 10, badge: "", stock: 10, specs: "" }]);
  const del = (id) => setProducts(products.filter(p => p.id !== id));
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[{ label: "Sales", value: orders.reduce((s,o)=>s+o.total,0) }, { label: "Orders", value: orders.length }, { label: "Users", value: users.length }, { label: "Inventory", value: products.length }].map((s, i) => (
          <Card key={i} className="rounded-2xl"><CardContent className="p-6"><div className="text-slate-500">{s.label}</div><div className="text-2xl font-bold">{s.value}</div></CardContent></Card>
        ))}
      </div>
      <div className="flex items-center justify-between mb-3"><h2 className="text-xl font-semibold">Products</h2><Button className="rounded-xl" onClick={addProduct}><Plus className="w-4 h-4 mr-2"/>Add</Button></div>
      <Card className="rounded-2xl"><CardContent className="p-6"><table className="w-full text-left"><thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{products.map(p => (<tr key={p.id}><td>{p.name}</td><td>${p.price}</td><td>{p.stock}</td><td className="flex gap-2"><Button size="sm" variant="outline"><Edit className="w-4 h-4"/></Button><Button size="sm" variant="outline" onClick={()=>del(p.id)}><Trash2 className="w-4 h-4"/></Button></td></tr>))}</tbody></table></CardContent></Card>
    </div>
  );
}

function StaticPage({ title }) {
  return (
    <div className="max-w-4xl mx-auto p-6"><h1 className="text-3xl font-bold mb-4">{title}</h1><Card className="rounded-2xl"><CardContent className="p-6">Content for {title} page.</CardContent></Card></div>
  );
}

export default function App() {
  const [route, setRoute] = useState({ name: "home" });
  const [products, setProducts] = useState(seedProducts);
  const [cart, setCart] = useState([]);
  const [dark, setDark] = useState(false);
  const [orders, setOrders] = useState([]);
  const [users] = useState([{ id: 1, name: "Admin" }]);

  const addToCart = (p) => setCart([...cart, p]);
  const placeOrder = () => {
    const total = cart.reduce((s,i)=>s+i.price,0);
    setOrders([...orders, { id: Date.now(), date: new Date().toLocaleDateString(), status: "Confirmed", total }]);
    setCart([]);
    setRoute({ name: "profile" });
  };

  const currentProduct = route.name === "product" ? products.find(p => p.id === route.id) : null;

  return (
    <div className={dark ? "dark min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-slate-50 text-slate-800"}>
      <Navbar setRoute={setRoute} cartCount={cart.length} dark={dark} setDark={setDark} />

      {route.name === "home" && <Home setRoute={setRoute} />}
      {route.name === "products" && <Products products={products} addToCart={addToCart} setRoute={setRoute} />}
      {route.name === "product" && <ProductDetails product={currentProduct} addToCart={addToCart} />}
      {route.name === "cart" && <Cart cart={cart} setRoute={setRoute} />}
      {route.name === "checkout" && <Checkout onPlace={placeOrder} />}
      {route.name === "login" && <Login setRoute={setRoute} />}
      {route.name === "register" && <Register setRoute={setRoute} />}
      {route.name === "profile" && <Profile orders={orders} />}
      {route.name === "tracking" && <Tracking />}
      {route.name === "admin" && <Admin products={products} setProducts={setProducts} orders={orders} users={users} />}
      {route.name === "about" && <StaticPage title="About" />}
      {route.name === "contact" && <StaticPage title="Contact" />}
      {route.name === "faq" && <StaticPage title="FAQ" />}
      {route.name === "policies" && <StaticPage title="Policies" />}

      <Footer setRoute={setRoute} />
    </div>
  );
}
