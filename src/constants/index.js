import {
  WalletIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "react-native-heroicons/outline";
import {
  WifiIcon,
  PhoneIcon,
  LightBulbIcon,
  GiftIcon,
  TruckIcon,
  AcademicCapIcon,
} from "react-native-heroicons/solid";

const Accounts = [
  {
    id: "a2",
    name: "Others",
    balance: "10,000",
    color: "#06D6A0",
  },
  {
    id: "a1",
    name: "Savings",
    balance: "50,000",
    color: "#F72585",
  },
  {
    id: "a0",
    name: "Current",
    balance: "10,000",
    color: "#001c55",
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

const QuickAccessIcon = ({ i, color }) => {
  switch (i) {
    case 0:
      return <PhoneIcon color={color} size={20} />;
    case 1:
      return <WifiIcon color={color} size={20} />;
    case 2:
      return <LightBulbIcon color={color} size={20} />;
    case 3:
      return <GiftIcon color={color} size={20} />;
    case 4:
      return <TruckIcon color={color} size={20} />;
    case 5:
      return <BanknotesIcon color={color} size={20} />;
    case 6:
      return <AcademicCapIcon color={color} size={20} />;
    default:
      return <PhoneIcon color={color} size={20} />;
  }
};

const QuickAccessList = [
  {
    name: "Airtime",
    color: "#FEC840",
  },
  { name: "Internet", color: "#1BCBEE" },
  { name: "Bill", color: "#F7675A" },
  { name: "GiftCard", color: "#FFC83F" },
  { name: "Logistics", color: "#F72585" },
  { name: "Betting", color: "green" },
  { name: "Tuition", color: "red" },
];

export { Accounts, Icon, QuickAccessList, QuickAccessIcon };
