import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

export const Store = () => {
    console.log(translations)
    return (
        <AppProvider i18n={translations}>
            <div>Store</div>
        </AppProvider>
    );
}
export default Store; 