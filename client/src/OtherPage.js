import React from "react";
import { Link } from 'react-router-dom';

const OtherPage = () => {
    return (
        <div>
            Sou uma outra pagina!
            <Link to="/">ir para home</Link>
        </div>
    );
};

export default OtherPage;
