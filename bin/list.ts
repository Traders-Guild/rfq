#!/usr/bin/env ts-node

import * as anchor from '@project-serum/anchor';
import * as dotenv from 'dotenv';

import { getRfqs } from '../lib/helpers';

dotenv.config();
anchor.setProvider(anchor.Provider.env());

const provider = anchor.getProvider();

const main = async (): Promise<any> => {
  const rfqs = await getRfqs(provider);
  return rfqs;
}

main()
  .then(rfqTitles => {
    console.log(rfqTitles);
  })
  .catch(err => {
    console.log(err);
  });