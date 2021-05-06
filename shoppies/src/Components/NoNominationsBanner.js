import React from 'react';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {Banner} from '@shopify/polaris';

const NoNominationsBanner = ({available}) => {
    if (!available) return null;
	return (
		<>
			<Banner showBanner={noNominationsLeft}
  title="You have already added 5 movies"
  action={{content: 'Review risk analysis'}}
  status="critical"
>
  <p>
    To add a different movie to the nominations, please{' '}
    delete a movie nomination from the list and add
    a new one.
  </p>
</Banner>
		</>
	);
};

export default NoNominationsBanner;