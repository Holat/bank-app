import {
  BanknotesIcon,
  CreditCardIcon,
  WalletIcon,
} from "react-native-heroicons/outline";

const Accounts = [
  {
    id: "a0",
    name: "Current",
    balance: "10,000",
    color: "#001c55",
  },
  {
    id: "a1",
    name: "Savings",
    balance: "50,000",
    color: "#F72585",
  },
  {
    id: "a2",
    name: "others",
    balance: "10,000",
    color: "#06D6A0",
  },
];

const Icon = ({ i, style }) => {
  return (
    <>
      {i === "a2" ? (
        <CreditCardIcon color={"white"} size={200} style={style} />
      ) : i === "a1" ? (
        <WalletIcon color={"white"} size={200} style={style} />
      ) : (
        <BanknotesIcon color={"white"} size={200} style={style} />
      )}
    </>
  );
};

export { Accounts, Icon };
