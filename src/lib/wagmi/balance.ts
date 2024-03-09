import { getBalance } from '@wagmi/core'
import  {config}  from '@/app/providers'

export const Balance = getBalance(config, {
  address: '0xE3D181F5C4672fdCbd2e9Cf021DF95ecFE6DC4A4',
})