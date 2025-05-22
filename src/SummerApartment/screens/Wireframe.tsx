
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/butoon";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export const Wireframe = (): JSX.Element => {
  // Property data for the table
  const propertyData = [
    {
      id: 1,
      price: "2,500,500",
      balconySize: '15 מ"ר',
      rooms: "8",
      apartmentSize: '120 מ"ר',
      neighborhood: "רמת שלמה",
      city: "בני ברק",
      cityColor: "#ddffcd",
      cityTextColor: "#347314",
    },
    {
      id: 2,
      price: "2,500,500",
      balconySize: '15 מ"ר',
      rooms: "8",
      apartmentSize: '120 מ"ר',
      neighborhood: "רמת שלמה",
      city: "ירושלים",
      cityColor: "#fff9ec",
      cityTextColor: "#775508",
    },
    {
      id: 3,
      price: "2,500,500",
      balconySize: '15 מ"ר',
      rooms: "8",
      apartmentSize: '120 מ"ר',
      neighborhood: "רמת שלמה",
      city: "אלעד",
      cityColor: "#ffefef",
      cityTextColor: "#a72223",
    },
    {
      id: 4,
      price: "2,500,500",
      balconySize: '15 מ"ר',
      rooms: "8",
      apartmentSize: '120 מ"ר',
      neighborhood: "רמת שלמה",
      city: "בני ברק",
      cityColor: "#ddffcd",
      cityTextColor: "#347314",
    },
    {
      id: 5,
      price: "2,500,500",
      balconySize: '15 מ"ר',
      rooms: "8",
      apartmentSize: '120 מ"ר',
      neighborhood: "רמת שלמה",
      city: "בני ברק",
      cityColor: "#ddffcd",
      cityTextColor: "#347314",
    },
    {
      id: 6,
      price: "2,500,500",
      balconySize: '15 מ"ר',
      rooms: "8",
      apartmentSize: '120 מ"ר',
      neighborhood: "רמת שלמה",
      city: "בני ברק",
      cityColor: "#ddffcd",
      cityTextColor: "#347314",
    },
  ];

  // Property features data
  const propertyFeatures = [
    {
      id: 1,
      name: "מיזוג אויר",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/vector-82.svg",
    },
    {
      id: 2,
      name: "חניה",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/vector-10.svg",
    },
    {
      id: 3,
      name: "מחסן",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/xnix-line-home-5.png",
    },
    {
      id: 4,
      name: "משופצת",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/rectangle-1683.svg",
    },
    {
      id: 5,
      name: "נוף",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/vector-65.svg",
    },
    {
      id: 6,
      name: "מעלית",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1-5.svg",
    },
    {
      id: 7,
      name: "מרפסת סוכה",
      icon: "https://c.animaapp.com/maf1x2ip3AxrCN/img/vector-52.svg",
    },
    { id: 8, name: "קומה 2", icon: "" },
  ];

  // Filter options
  const filterOptions = [
    { id: 1, name: "מחיר" },
    { id: 2, name: "מספר חדרים" },
    { id: 3, name: "שכונה" },
    { id: 4, name: "עיר" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1920px] relative">
        {/* Header */}
        <header className="absolute w-full h-[83px] -top-px right-0 bg-white shadow-shadow-level1 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-[21px]">
              <div className="flex items-center p-3 rounded-[25px] border-[1.5px] border-solid border-[#e8e8e8]">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Notifications"
                  src="https://c.animaapp.com/maf1x2ip3AxrCN/img/notifications.svg"
                />
              </div>
              <div className="flex w-[42px] h-[42px] items-center justify-center rounded-[20px] border-[1.5px] border-solid border-[#e8e8e8]">
                <div className="flex w-8 h-8 items-center justify-center bg-[#232323] rounded-2xl">
                  <div className="[font-family:'Rubik',Helvetica] font-medium text-[#c8c8c8] text-sm text-right">
                    D
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-[20px] font-medium text-[#2e2e2e] text-[15px] [font-family:'Rubik',Helvetica] [direction:rtl]"
            >
              לפרסם דירה באתר
            </Button>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8 mr-16">
              <div className="font-semibold text-black text-[16.5px] tracking-[0] leading-[20.6px] whitespace-nowrap [font-family:'Rubik',Helvetica] [direction:rtl]">
                דירות לקניה
              </div>
              <div className="font-normal text-black text-[16.5px] tracking-[0] leading-[20.6px] whitespace-nowrap [font-family:'Rubik',Helvetica] [direction:rtl]">
                דירות להשכרה
              </div>
              <div className="font-normal text-black text-[16.5px] tracking-[0] leading-[20.6px] whitespace-nowrap [font-family:'Rubik',Helvetica] [direction:rtl]">
                דירות לנופש
              </div>
            </nav>
            <div className="font-bold text-[#fa3a7a] text-[35.6px] tracking-[-2.14px] leading-[51.3px] whitespace-nowrap [font-family:'Rubik',Helvetica] [direction:rtl]">
              אתרא
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-[130px] px-6">
          {/* Page Title and Description */}
          <div className="flex flex-col w-full max-w-[903px] items-end gap-6 mx-auto mb-10">
            <h1 className="self-stretch font-semibold text-black text-[40px] tracking-[0] leading-[50px] [font-family:'Rubik',Helvetica] [direction:rtl]">
              דירות לקניה
            </h1>
            <p className="self-stretch font-body-regular text-black text-[length:var(--body-regular-font-size)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [direction:rtl] [font-style:var(--body-regular-font-style)]">
              לפניכם רשימה של דירות, כולל מידע ראשוני על כל דירה. לחיצה על דירה
              תציג את הפרטים המלאים. ניתן לסמן דירות באמצעות הריבוע מימין, ולבצע
              פעולות כמו השוואה, הדפסה ושליחה במייל.
            </p>
          </div>

          {/* Filter Hint */}
          <div className="text-right mb-6 font-normal text-[#6a6a6a] text-sm tracking-[0] leading-[17.5px] whitespace-nowrap [font-family:'Rubik',Helvetica] [direction:rtl]">
            השתמשו במסננים והתחילו לחפש
          </div>

          {/* Filter Options */}
          <div className="flex items-start justify-end gap-2 mb-6">
            {filterOptions.map((filter) => (
              <div
                key={filter.id}
                className="flex flex-col items-end justify-center px-4 py-2 bg-neutral-100 rounded-3xl"
              >
                <div className="flex items-center gap-6 w-full">
                  <img
                    className="w-2.5 h-[5.97px]"
                    alt="Path"
                    src="https://c.animaapp.com/maf1x2ip3AxrCN/img/path-186357.svg"
                  />
                  <div className="[font-family:'Rubik',Helvetica] font-medium text-black text-sm tracking-[-0.01px] leading-5 whitespace-nowrap [direction:rtl]">
                    {filter.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-[#b5c7e2] mb-6" />

          {/* Sort and Actions */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="[font-family:'Rubik',Helvetica] font-medium text-black text-sm tracking-[-0.01px] leading-5 whitespace-nowrap [direction:rtl]">
                מיון לפי
              </span>
              <img
                className="w-3.5 h-3.5"
                alt="Filter"
                src="https://c.animaapp.com/maf1x2ip3AxrCN/img/filter.svg"
              />
            </div>
            <div className="flex items-center gap-6 pl-4">
              <img
                className="w-4 h-[17px]"
                alt="Outline download"
                src="https://c.animaapp.com/maf1x2ip3AxrCN/img/outline-download.png"
              />
              <img
                className="w-5 h-4"
                alt="Icon olor"
                src="https://c.animaapp.com/maf1x2ip3AxrCN/img/---icon--olor.svg"
              />
              <img
                className="w-[17.78px] h-4"
                alt="Outline printer"
                src="https://c.animaapp.com/maf1x2ip3AxrCN/img/outline-printer.png"
              />
              <Checkbox id="select-all" className="w-4 h-4 border-[#444746]" />
            </div>
          </div>

          {/* Properties Table */}
          <div className="w-full max-w-[1172px] mx-auto mb-10">
            <Table>
              <TableHeader className="bg-neutral-100 border-b border-[#b5c7e2]">
                <TableRow>
                  <TableCell className="w-[51px]"></TableCell>
                  <TableCell className="w-[180px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[11px] h-[11px] relative">
                        <img
                          className="absolute w-2 h-1 left-px top-0"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1.svg"
                        />
                        <img
                          className="absolute w-2 h-1 left-px top-1.5"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-2.svg"
                        />
                      </div>
                      <div className="font-body-regular text-black [direction:rtl]">
                        מחיר
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[11px] h-[11px] relative">
                        <img
                          className="absolute w-2 h-1 left-px top-0"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1.svg"
                        />
                        <img
                          className="absolute w-2 h-1 left-px top-1.5"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-2.svg"
                        />
                      </div>
                      <div className="font-body-regular text-black [direction:rtl]">
                        מרפסת
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[11px] h-[11px] relative">
                        <img
                          className="absolute w-2 h-1 left-px top-0"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1.svg"
                        />
                        <img
                          className="absolute w-2 h-1 left-px top-1.5"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-2.svg"
                        />
                      </div>
                      <div className="font-body-regular text-black [direction:rtl]">
                        מספר חדרים
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[11px] h-[11px] relative">
                        <img
                          className="absolute w-2 h-1 left-px top-0"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1.svg"
                        />
                        <img
                          className="absolute w-2 h-1 left-px top-1.5"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-2.svg"
                        />
                      </div>
                      <div className="font-body-regular text-black [direction:rtl]">
                        שטח הדירה
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[11px] h-[11px] relative">
                        <img
                          className="absolute w-2 h-1 left-px top-0"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1.svg"
                        />
                        <img
                          className="absolute w-2 h-1 left-px top-1.5"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-2.svg"
                        />
                      </div>
                      <div className="font-body-regular text-black [direction:rtl]">
                        שכונה
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[11px] h-[11px] relative">
                        <img
                          className="absolute w-2 h-1 left-px top-0"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-1.svg"
                        />
                        <img
                          className="absolute w-2 h-1 left-px top-1.5"
                          alt="Polygon"
                          src="https://c.animaapp.com/maf1x2ip3AxrCN/img/polygon-2.svg"
                        />
                      </div>
                      <div className="font-body-regular text-black [direction:rtl]">
                        עיר
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[60px]">
                    <Checkbox className="w-4 h-4 border-black" />
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyData.map((property) => (
                  <TableRow
                    key={property.id}
                    className="border-b border-[#b5c7e2]"
                  >
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div className="w-[27px] h-[27px] rounded-[13.5px] border-[1.7px] border-solid border-[#0068f5] flex items-center justify-center">
                          <img
                            className="w-[10.27px] h-1.5"
                            alt="Outline arrow down"
                            src={`https://c.animaapp.com/maf1x2ip3AxrCN/img/outline-arrow-down${property.id > 1 ? `-${property.id - 1}` : ""}.png`}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right font-body-medium text-[#0c3058]">
                        {property.price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right font-body-regular text-[#0c3058] [direction:rtl]">
                        {property.balconySize}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Badge
                          className={`bg-[#ddffcd] text-[#347314] rounded-[100px] px-2 py-0 min-h-8`}
                        >
                          {property.rooms}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right font-body-regular text-[#0c3058] [direction:rtl]">
                        {property.apartmentSize}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right font-body-regular text-[#0c3058] [direction:rtl]">
                        {property.neighborhood}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Badge
                          className={`bg-[${property.cityColor}] text-[${property.cityTextColor}] rounded-[100px] px-3 py-0 min-h-8`}
                          style={{
                            backgroundColor: property.cityColor,
                            color: property.cityTextColor,
                          }}
                        >
                          <span className="[direction:rtl]">
                            {property.city}
                          </span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Checkbox className="w-4 h-4 border-[#000001]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Property Details */}
          <Card className="w-full max-w-[1172px] mx-auto bg-neutral-100 border-r-4 border-[#313131] p-0">
            <CardContent className="p-0">
              <div className="p-8">
                <h2 className="text-right mb-4 font-body-bold text-[#0c3058] [direction:rtl]">
                  תמונות של הדירה
                </h2>

                <div className="flex gap-4 mb-8">
                  <div className="relative w-[322px] h-[211px] bg-[url(https://c.animaapp.com/maf1x2ip3AxrCN/img/image.png)] bg-cover bg-center">
                    <div className="absolute bottom-4 left-6 bg-white rounded-lg border border-solid border-[#313131] px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 grid grid-cols-3 grid-rows-3 gap-0">
                          {[...Array(9)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 bg-[#313131] rounded-[1.5px] border-[0.5px] border-solid"
                            />
                          ))}
                        </div>
                        <div className="font-body-medium text-[#313131] text-center [direction:rtl]">
                          להצגת כל התמונות
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="w-[322px] h-[211px] object-cover"
                    alt="Property image"
                    src="https://c.animaapp.com/maf1x2ip3AxrCN/img/image-1.png"
                  />
                  <img
                    className="w-[322px] h-[211px] object-cover"
                    alt="Property image"
                    src="https://c.animaapp.com/maf1x2ip3AxrCN/img/image-2.png"
                  />
                </div>

                <div className="flex gap-8">
                  {/* Property Features */}
                  <div className="flex flex-wrap gap-2 max-w-[600px]">
                    {propertyFeatures.map((feature) => (
                      <Badge
                        key={feature.id}
                        variant="outline"
                        className="h-7 bg-white rounded-[100px] border-[0.78px] border-[#313131] px-2 py-0 flex items-center gap-1"
                      >
                        {feature.icon && (
                          <div className="w-[18.4px] h-[18.4px] flex items-center justify-center">
                            <img
                              src={feature.icon}
                              alt={feature.name}
                              className="w-3 h-3"
                            />
                          </div>
                        )}
                        <span className="font-normal text-[#313131] text-[12.4px] text-center leading-[15.6px] whitespace-nowrap [direction:rtl] [font-family:'Rubik',Helvetica]">
                          {feature.name}
                        </span>
                      </Badge>
                    ))}
                  </div>

                  {/* Contact Card */}
                  <Card className="w-[338px] h-[257px] bg-white rounded-lg shadow-shadow-level2">
                    <CardContent className="p-5">
                      <h3 className="text-right mb-4 font-body-bold text-[#313131] [direction:rtl]">
                        יצירת קשר
                      </h3>
                      <div className="flex flex-col items-end gap-3 mb-6">
                        <div className="flex items-center justify-end gap-[13px]">
                          <div className="font-body-regular text-[#313131] [direction:rtl]">
                            מיקום: עם ועולמו 3, ירושלים
                          </div>
                          <div className="w-[14.3px] h-[16.79px] bg-[url(https://c.animaapp.com/maf1x2ip3AxrCN/img/pin.png)] bg-[100%_100%]" />
                        </div>
                        <div className="flex items-end gap-3">
                          <div className="font-body-regular text-[#222222] [direction:rtl]">
                            טלפון: 054-24598323
                          </div>
                          <img
                            className="w-[16.49px] h-[15.89px]"
                            alt="Phone"
                            src="https://c.animaapp.com/maf1x2ip3AxrCN/img/phone.png"
                          />
                        </div>
                        <div className="flex items-center gap-[13px]">
                          <div className="[font-family:'Rubik',Helvetica] font-normal text-[#313131] text-base [direction:rtl]">
                            <span className="leading-5">אימייל: </span>
                            <span className="leading-[var(--body-regular-line-height)] underline font-body-regular [font-style:var(--body-regular-font-style)] font-[number:var(--body-regular-font-weight)] tracking-[var(--body-regular-letter-spacing)] text-[length:var(--body-regular-font-size)]">
                              mail@gmail.com
                            </span>
                          </div>
                          <img
                            className="w-[16.49px] h-[12.71px]"
                            alt="Email"
                            src="https://c.animaapp.com/maf1x2ip3AxrCN/img/email.png"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <img
                            className="w-4 h-[17px]"
                            alt="Outline download"
                            src="https://c.animaapp.com/maf1x2ip3AxrCN/img/outline-download-1.png"
                          />
                          <img
                            className="w-5 h-4"
                            alt="Icon olor"
                            src="https://c.animaapp.com/maf1x2ip3AxrCN/img/---icon--olor.svg"
                          />
                          <img
                            className="w-[18px] h-4"
                            alt="Outline printer"
                            src="https://c.animaapp.com/maf1x2ip3AxrCN/img/outline-printer-1.png"
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="h-8 border-[#fa3a7a] text-[#fa3a7a] [direction:rtl]"
                        >
                          שמירה להמשך
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-5" />

                <div className="max-w-[594px] ml-auto">
                  <p className="font-body-regular text-[#313131] [direction:rtl]">
                  הדירה נמצאת במיקום מרכזי ושקט, קרוב לתחבורה ציבורית, גני ילדים, ובתי כנסת. 
                    היא מתאימה במיוחד למשפחות המעוניינות בשילוב של איכות חיים, נוחות וקרבה למרכזים קהילתיים.
                    הנכס עבר שיפוץ מקיף לאחרונה וכולל מפרט טכני עשיר, עם אפשרות לתוסxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};