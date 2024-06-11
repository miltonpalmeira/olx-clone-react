import { useNavigate } from 'react-router-dom';
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from '../../components/MainComponents/MainComponents';
import { PageArea } from './styled';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import OlxApi from '../../helpers/OlxApi';
import { CategoryList } from '../../types';
import { createNumberMask } from 'text-mask-addons';
import MaskedInput from 'react-text-mask';
import { isLogged } from '../../helpers/authHandlers';

export default function AddAd() {
  const api = OlxApi();
  const navigate = useNavigate();
  const fileField = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<CategoryList[]>([]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories(navigate);
      setCategories(cats);
    };
    getCategories();
  }, [api, navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDisabled(true);
    setError('');
    let errors = [];

    if (!title.trim()) {
      errors.push('Sem título');
    }

    if (!category) {
      errors.push('Sem categoria');
    }

    console.log(isLogged())

    if (errors.length === 0) {
      const fData = new FormData();
      fData.append('title', title);
      fData.append('price', price);
      fData.append('priceneg', String(priceNegotiable));
      fData.append('desc', desc);
      fData.append('cat', category);

      if (!fileField?.current) fData.append('img', 'Without image');
      else {
        if (fileField?.current.files) {
          for (let i = 0; i < fileField.current.files.length; i++) {
            fData.append('img', fileField.current.files[i]);
          }
        }
      }

      const json = await api.addAd(fData);

      if (!json.error) {
        navigate(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error);
      }
    } else {
      setError(errors.join('\n'));
    }

    setDisabled(false);
  };

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className='area'>
            <div className='area--title'></div>
            <div className='area--input'>
              <input
                placeholder='Titulo'
                type='text'
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>

          <label className='area'>
            <div className='area--title'></div>
            <div className='area--input'>
              <textarea
                placeholder='Descrição'
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>

          <label className='area'>
            <div className='area--title'>Categoria</div>

            <div className='area--input'>
              <select
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories &&
                  categories.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>
          <label className='area'>
            <div className='area--title'>Preço</div>
            <div className='area--input'>
              <MaskedInput
                className='price'
                mask={priceMask}
                placeholder='R$ '
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPrice(e.target.value)
                }
              />
            </div>
          </label>
          <label className='area'>
            <div className='area--title'>Preço Negociável</div>
            <div className='area--input'>
              <input
                className='check-box'
                type='checkbox'
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className='area'>
            <div className='area--title'>Imagens (1 ou mais)</div>
            <div className='area--input'>
              <input type='file' disabled={disabled} ref={fileField} multiple />
            </div>
          </label>
          <label className='area'>
            <div className='area--title'></div>
            <div className='area--input'>
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}
