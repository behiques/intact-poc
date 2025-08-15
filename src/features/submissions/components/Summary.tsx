import { Alert } from '@/features/ui/Alert'
import { Button } from '@/features/ui/Form/Button'
import { FormGroup } from '@/features/ui/Form/FormGroup'
import { BriefcaseIcon, HomeIcon, UserIcon } from '@heroicons/react/20/solid'

export const Summary = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      <Alert message="Submission complete" type="success" />

      <FormGroup headerText="Account 6235731">
        <ul className="grid grid-cols-2 space-y-4 text-sm text-gray-700">
          <li className="flex">
            <UserIcon width={20} className="mr-2 fill-gray-300" />
            0403698 Integro USA Inc.
          </li>
          <li className="flex items-center">
            <BriefcaseIcon width={20} className="mr-2 fill-gray-300" />{' '}
            Financial Institutions
          </li>
          <li className="flex items-start">
            <HomeIcon width={20} className="mr-2 fill-gray-300" /> bier demo
            7.8.25
            <br />
            1051 TEXAS ST, SALEM, Virginia, 241535402
          </li>
        </ul>
      </FormGroup>

      <FormGroup headerText="Summary">
        <div className="relative">
          <div className="absolute top-0 right-0 flex space-x-2">
            <Button type="outline">Send to Processing</Button>
            <Button type="outline">Send to Processing</Button>
          </div>
          <ul className="flex flex-col space-y-4 text-sm text-gray-700">
            <li>
              <strong>Program:</strong> Domestic
            </li>
            <li>
              <strong>Business Type:</strong> FINANCIAL INSTITUTIONS
            </li>
            <li>
              <strong>Program:</strong> FI ASSET MANAGEMENT RISK SOLUTIONS
            </li>
            <li>
              <ul className="grid grid-cols-3 gap-4">
                <li>
                  <strong>Submission Length:</strong> 12 months
                </li>
                <li>
                  <strong>Effective Date:</strong> July 08, 2025
                </li>
                <li>
                  <strong>Expiration Date:</strong> July 08, 2026
                </li>
              </ul>
            </li>
            <li>
              <strong>Underwriter:</strong> Brian Andrews
            </li>
            <li>
              <strong>Communication:</strong> Notifications sent to
              BAndrews@intactinsurance.com, a2@intactinsurance.com
            </li>
          </ul>
        </div>
      </FormGroup>
    </div>
  )
}
