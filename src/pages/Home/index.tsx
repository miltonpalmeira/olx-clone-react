import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/MainComponents/MainComponents';
import { SearchArea, PageArea } from './styled';
import { useState } from 'react';
import OlxApi from '../../helpers/OlxApi';

export default function Home() {
  const api = OlxApi();
  const navigate = useNavigate();

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className='searchBox'>
            <form action='/ads' method='GET'>
              <input type='text' name='q' placeholder='O que você procura?' />
              <select name='state'>
                
              </select>
            </form>
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>...</PageArea>
        <Link to={`/`}>Home</Link>
      </PageContainer>
    </>
  );
}
