// represents the fields that will be returned from the database
export const DoctorSelectingCriteria = {
  name: true,
  phone: true,
  identifier: true,
  createdAt: true,
  Doctor: {
    select: {
      specialization: true,
      address: true,
    },
  },
};
