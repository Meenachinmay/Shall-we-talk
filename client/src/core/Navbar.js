import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
    <div className="flex items-center justify-between p-7 text-white"　style={{background: '#4f46e5'}}>
        <Link to="/">リアルコネクト</Link>
        <div className="flex items-center">
            <Link to='/register' className="mx-2 cursor-pointer">サインアップ</Link>
            <Link to='/login' className="mx-2 cursor-pointer">サインイン</Link>
            <Link to='/auth/activate' className="mx-2 cursor-pointer"> Activation</Link>
        </div>
    </div>
    )
}

export default Navbar;