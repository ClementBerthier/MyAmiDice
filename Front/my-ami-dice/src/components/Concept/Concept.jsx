import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './style.scss';

function Concept() {
  
  return (
    <div className='concept'>
      <div className='concept-container'>
        <p>
          Droit devant, en plein dans leurs tronches. Mais parce qu’on a des frais! Vous pouvez pas vous rentrer ça dans le crâne?
          Alors par contre, si vous sentez qu’il s’énerve un peu, hein, vous lui sortez un morceau de viande. Sire, mon père était peut-être unijambiste mais, moi, ma femme a pas de moustache! Ouais… Ouais je me suis gouré… Droit devant, en plein dans leurs tronches. Un chef de guerre qui commande plus c’est pas bon. Il va déprimer, il va s’mettre à bouffer, il va prendre quarante livres! Mais ils ont pas le droit de décider de la retraite eux-mêmes! On l’a dit et redit ça! Sinon on fait un tunnel jusqu'à notre campement. Léodagan et moi on creuse, pendant vous balancez de la caillasse dans l'autre sens pour les éloigner du chantier.
        </p>
        <Link to='/demo'>
          <Button className='concept-container-buttondemo' negative>Démo</Button>
        </Link>
      </div>
    </div>
  )
}

export default Concept