import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ErrorMessage,
  PageContainer,
} from "../../components/MainComponents/MainComponents";
import { PageArea, Fake } from "./styled";
import { useEffect, useState } from "react";
import OlxApi from "../../helpers/OlxApi";

export default function AdPage() {
  const api = OlxApi();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState([]);

  useEffect(() => {
    const getAdInfo = async (adId: string | undefined) => {
      const json = await api.getAd(id, true, navigate);
      setAdInfo(json);
      setLoading(false);
    }
    getAdInfo(id);
  }, []);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adName">{loading && <Fake height={20} />}</div>
            <div className="adImage">{loading && <Fake height={300} />}</div>
            <div className="adInfo">
              <div className="adPrice">{loading && <Fake height={20} />}</div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
          </div>
          <div className="box box--padding">
            {loading && <Fake height={50} />}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
}