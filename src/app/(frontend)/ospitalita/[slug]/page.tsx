import Image from "next/image";
import { urlFor } from "../../../../sanity/lib/image";
import { sanityFetch } from "../../../../sanity/lib/live";
import {
  DORMIRE_QUERY,
  SINGLE_OSPITALITA_QUERY,
} from "../../../../sanity/lib/queries";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Metadata } from "next";
import GoogleMap from "@/components/GoogleMaps";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = (await props.params).slug;
  const { data: page } = await sanityFetch({
    query: SINGLE_OSPITALITA_QUERY,
    params: { slug: params },
    // Metadata non deve mai contenere stega
    stega: false,
  });

  return {
    title: `SMOF - Ospitalità: ${page?.luogo}`,
    description: `Scopri l'ospitalità a ${page?.luogo} durante il San Martino Outdoor Fest`,
    keywords: [
      "San Martino Outdoor Fest",
      "SMOF",
      "Eventi Oudoor San Martino delle scale",
      "Festival San Martino",
    ],
    openGraph: {
      title: `SMOF - Ospitalità: ${page?.luogo}`,
      locale: "it_IT",
      siteName: "SMOF - San Martino outdoor Fest",
      type: "website",
      url: `https://www.smofest.it/ospitalita/${page?.luogo?.toLowerCase().replace(/\s+/g, "-")}`,
      images: [
        {
          url: "/logo_smof.png",
          width: 1200,
          height: 630,
          alt: "SMOF - San Martino Outdoor Fest",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `SMOF - Ospitalità: ${page?.luogo}`,
      description:
        `${page?.descrizione}` || "Ospitalità San Martino Outdoor Fest",
      images: ["/logo_smof.png"],
    },
  } satisfies Metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: ospitalita } = await sanityFetch({
    query: SINGLE_OSPITALITA_QUERY,
    params: await params,
  });

  const { data: dormire } = await sanityFetch({
    query: DORMIRE_QUERY,
    params: await params,
  });

  return (
    <div className="flex flex-col items-center justify-center  gap-5 w-full">
      <div
        className={`container mx-auto flex flex-col max-sm:p-6 pb-10 text-chocolate`}
      >
        <h3
          className={`${ospitalita?.luogo === "Dove Dormire" && "hidden "} text-center text-2xl max-sm:text-center  md:text-3xl lg:text-5xl font-semibold text-mustard text-pretty mt-20 mb-10`}
        >
          {ospitalita?.luogo}
        </h3>
        {/* {ospitalita?.immagine ? (
					<Image
						src={urlFor(ospitalita?.immagine).auto("format").url()}
						className="h-auto  object-cover rounded-lg gap-10"
						width="1800"
						height="480"
						alt="thumbnail"
					/>
				) : null} */}
        {ospitalita?.descrizione ? (
          <div className="bg-ivory p-4 rounded-2xl text-xl text-justify my-20">
            <PortableText
              value={ospitalita?.descrizione}
              components={{
                ...components,
                types: {
                  ...(components as any).types,
                  image: ({ value }: any) =>
                    value ? (
                      <Image
                        src={urlFor(value).format("webp").quality(70).url()}
                        alt={value.alt || "immagine"}
                        className="md:float-right ml-8 mb-4 mr-2 w-2/4 max-md:w-full max-md:ml-0 rounded-lg "
                        width={1800}
                        height={680}
                      />
                    ) : null,
                },
              }}
            />
          </div>
        ) : null}

        {ospitalita?.luogo === "San Martino delle Scale " && (
          <GoogleMap address="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12560.512426348978!2d13.243660564520034!3d38.090681798642066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319edc277cc79d5%3A0x260b042a9d31e931!2s90046%20San%20Martino%20delle%20Scale%20PA!5e0!3m2!1sit!2sit!4v1780042519140!5m2!1sit!2sit" />
        )}
        {ospitalita?.luogo === "Monreale" && (
          <GoogleMap address="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12562.646936290404!2d13.281564264512312!3d38.07825819869022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319ee3c15d9e9bf%3A0xc9f05a91152d7dfd!2s90046%20Monreale%20PA!5e0!3m2!1sit!2sit!4v1780044417490!5m2!1sit!2sit" />
        )}

        {(await params).slug === "dove-dormire" && (
          <>
            <h1
              className={`text-center text-[clamp(2rem,5vw+0.5rem,3rem)] font-semibold text-mustard mt-20 mb-20`}
            >
              Ospitalità
            </h1>
            <h2 className="text-center text-[clamp(2rem,5vw+0.5rem,2.5rem)] font-semibold text-mustard mb-10">
              {ospitalita?.luogo}
            </h2>
            <div className="relative">
              <Table className="bg-ivory rounded-2xl  ">
                <TableHeader>
                  <TableRow className="text-lg">
                    <TableHead className="font-semibold p-4">
                      Denominazione
                    </TableHead>
                    <TableHead className="font-semibold p-4">
                      Contatti
                    </TableHead>
                    <TableHead className="font-semibold p-4">
                      Indirizzo
                    </TableHead>
                    <TableHead className="font-semibold p-4">Web</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dormire.map((dorm) => (
                    <TableRow className="text-lg" key={dorm.denominazione}>
                      <TableCell className="p-4 font-semibold">
                        {dorm.denominazione}
                      </TableCell>
                      <TableCell className="whitespace-pre-line p-4">
                        {dorm.contatti}
                      </TableCell>
                      <TableCell className="p-4">{dorm.indirizzo}</TableCell>
                      <TableCell className="p-4">{dorm.web}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
