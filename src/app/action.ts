'use server';

import getSheets from '@/services/getSheets';

export async function sheets() {
  getSheets();
}
