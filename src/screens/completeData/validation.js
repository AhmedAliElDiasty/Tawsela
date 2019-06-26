import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values =>
  yup.object().shape({
    location: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(/^[A-Za-z\s]+$/, I18n.t('signup-name-EN-invalid'),
        I18n.t('location-name-AR-invalid'),
      )
      .test('nameAr', I18n.t('signup-name-AR-invalid'), () =>
        isNaN(values.location),
      )
      .min(2, I18n.t('field-must-be-larger-than-one-chars')),

   
  });