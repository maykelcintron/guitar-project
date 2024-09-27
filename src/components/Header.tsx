import { useState, useMemo } from "react";
import { db } from "../data/db";
import { GuitarE } from '../types/type'
import { Guitar } from "./Guitar";
import { Footer } from "./Footer";

type Cart = GuitarE[];

const Header = () => {
    const [data, setData] = useState(db);
    const [cart, setCart] = useState<Cart>([]);
    
    const MAX_GUITARS = 5;
    const MIN_GUITARS = 1;

    const isEmpty = useMemo((): boolean => cart.length == 0, [cart]);

    let total = 0;
    for (const guitar of cart) {
        total += (guitar.price * guitar.quantity);
    }
    
    const addToCart = (name: string) => {
        const guitar = data.find((guitar) => guitar.name == name)!;
        
        if(cart.includes(guitar)){
            const index = cart.indexOf(guitar);
            const updatedCart = [...cart];

            if(updatedCart[index].quantity < MAX_GUITARS){
                updatedCart[index].quantity++;
            }
            
            setCart([...updatedCart]);
        }else{
            setCart([...cart, guitar]);
        }
    }

    const increaseQuantity = (guitar: GuitarE) =>{
        const index = cart.indexOf(guitar);
        const updatedCart = [...cart];

        if(updatedCart[index].quantity < MAX_GUITARS){
            updatedCart[index].quantity++;
            setCart(updatedCart);
        }
    };
    
    const decreaseQuantity = (guitar: GuitarE) =>{
        const index = cart.indexOf(guitar);
        const updatedCart = [...cart];
        
        if(updatedCart[index].quantity > MIN_GUITARS){
            updatedCart[index].quantity--;
            setCart(updatedCart);
        }
    };

    const removeCart = (name: string) => {
        const updatedCart = cart.filter((guitar) => guitar.name != name);
        setCart(updatedCart);
        
        const updatedData = [...data];
        const index = updatedData.indexOf(cart.filter((guitar) => guitar.name == name)[0]);
        updatedData[index].quantity = 1;
        
        setData(updatedData);
    }

    const clearCart = (): void =>{
        const dataSet = data.map((dt)=> {
            dt.quantity = 1;
            return dt;
        });

        setData([...dataSet]);
        setCart([]);
    } 

    
    return( 
    <>
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? <p className="text-center">El carrito esta vacio</p> :
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((guitar)=>(
                                                <tr key={guitar.name}>
                                                    <td>
                                                        <img className="img-fluid" src={`img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    <td>{guitar.name}</td>
                                                    <td className="fw-bold">
                                                            {guitar.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => decreaseQuantity(guitar)}
                                                        >
                                                            -
                                                        </button>
                                                            {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(guitar)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => removeCart(guitar.name)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total pagar: <span className="fw-bold">{total}$</span></p>
                                </>
                                }

                                <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar)=>
                    (<Guitar
                        key={guitar.name}
                        name={guitar.name} 
                        description={guitar.description}
                        image={guitar.image}
                        price={guitar.price}
                        addToCart={addToCart}
                    />)
                )}
            </div>
        </main>

        <Footer />
    </>
)
}

export {Header};