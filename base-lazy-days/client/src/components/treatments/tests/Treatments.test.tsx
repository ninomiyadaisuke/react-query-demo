import { screen } from '@testing-library/react';

import { renderWithQueryClient } from '../../../test-utils';
import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  renderWithQueryClient(<Treatments />);
  const treatmentTiltes = await screen.findAllByRole('heading', {
    name: /massage|facial|scrub/i, // /iは大文字小文字を無視する正規表現
  });
  expect(treatmentTiltes).toHaveLength(3);
});
