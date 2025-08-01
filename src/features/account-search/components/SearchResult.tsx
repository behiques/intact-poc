import { CollapseIcon, ExpandIcon } from '../assets/Icons'
import { AccountSearchResultProp } from '../types'

export const SearchResult = ({
  item,
  showing,
  onClick,
}: AccountSearchResultProp) => {
  return (
    <div
      className="relative cursor-pointer border-2 border-gray-300 bg-white text-sm shadow-sm"
      onClick={onClick}
    >
      <div className="float-end">
        {!showing ? <ExpandIcon /> : <CollapseIcon />}
      </div>
      <div className=" p-4">
        <p className="font-bold text-teal-700">
          {item.account.name} - {item.account.businessUnitName}
        </p>
        <p className="text-gray-700">
          {item.account.address.street}, {item.account.address.city},{' '}
          {item.account.address.state}, {item.account.address.zip}
        </p>
        <p className="mt-2 text-sm font-bold text-black">
          Additional Name
          <span className="font-normal"> {item.account.name2}</span>
        </p>
        <p className="text-sm font-bold text-black">DBA {item.account.dba}</p>
        <p className="text-sm font-bold text-black">FKA {item.account.fka}</p>
      </div>

      {showing && (
        <div className="-mb-0.5 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-0.5 text-left text-sm">
            <tbody>
              {[1, 2].map((row, index) => (
                <tr key={index} className="rounded bg-blue-100">
                  <td className="px-3 py-2">{item.term.businessUnitName}</td>
                  <td className="px-3 py-2">{item.term.programType}</td>
                  <td className="px-3 py-2">{item.term.effectiveDate}</td>
                  <td className="px-3 py-2">{item.term.expirationDate}</td>
                  <td className="px-3 py-2">{item.term.status}</td>
                  <td className="px-3 py-2">
                    {item.term.producerCode}
                    <br />
                    {item.term.producerName}
                    <br />
                    BROOKE INSURANCE AGENCY INC
                  </td>
                  <td className="px-3 py-2">{item.term.underwriter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
