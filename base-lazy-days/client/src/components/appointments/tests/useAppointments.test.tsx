import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

// a helper function to get the total number of appointments from an AppointmentDateMap object
const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  // await for the appointments to populate
  await waitFor(() => Object.keys(result.current.appointments).length > 0);

  const filterAppointmentsLength = Object.keys(result.current.appointments)
    .length;

  // set to show all appointments
  act(() => result.current.setShowAll(true));

  // wait for the appointments
  await waitFor(() => {
    return (
      getAppointmentCount(result.current.appointments) >
      filterAppointmentsLength
    );
  });
});
