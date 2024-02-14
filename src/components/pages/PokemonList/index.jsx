import './PokemonList.css';

import { useEffect, useState } from 'react';
import httpGet from '../../../api/http';
import PokemonCard from '../../atoms/PokemonCard';
import { API_BASE } from '../../../common/constants/api';
import SearchBar from '../../molecules/SearchBar';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MAX_POKEMON_AMOUNT = 150;
const PAGE_SIZE = 10;

function getOffset(page) {
    return (page - 1) * PAGE_SIZE;
}

function getTotalPages() {
    return Math.ceil(MAX_POKEMON_AMOUNT / PAGE_SIZE);
}

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const totalPages = getTotalPages();

    useEffect(() => {
        httpGet(`${API_BASE}?limit=${PAGE_SIZE}&offset=${getOffset(page)}`)
            .then(({ results }) => {
                setPokemonList(results);
            });
    }, [page]);

    function onPageChange(step) {
        if ((page === 1 && step === -1) || (page === totalPages && step === 1)) return;

        navigate(`?page=${parseInt(page) + step}`);
    }

    return (
        <main className="pokemon">
            <h1 className="pokemon-title">{MAX_POKEMON_AMOUNT} Pokemon List</h1>
            <SearchBar />
            <ul className="pokemon-list">
                {pokemonList.map((({ name, url }) => <PokemonCard key={name} url={url} />))}
            </ul>
            <div className="pokemon-pagination">
                <span>Total {MAX_POKEMON_AMOUNT}</span>
                <div>
                    <button type="button" onClick={() => navigate(`?page=${1}`)}>{'<<'}</button>
                    <button type="button" onClick={() => onPageChange(-1)}>{'<'}</button>
                    <span>{page} / {getTotalPages()}</span>
                    <button type="button" onClick={() => onPageChange(1)}>{'>'}</button>
                    <button type="button" onClick={() => navigate(`?page=${totalPages}`)}>{'>>'}</button>
                </div>
            </div>
        </main>
    );
}

export default PokemonList;
