import Image from "next/image";
import {
  deleteActualiteImage,
  moveActualiteImage,
  setCoverImage,
  updateImageAlt,
  uploadActualiteImage,
} from "@/app/admin/(dashboard)/actualites/actions";
import type { Actualite, ActualiteImage } from "@/lib/data/actualite-constants";
import { DeleteButton } from "./DeleteButton";
import { inputClass, secondaryButtonClass } from "./ui";
import { UploadField } from "./UploadField";

export function ActualiteGalerieManager({ actualite, images }: { actualite: Actualite; images: ActualiteImage[] }) {
  const upload = uploadActualiteImage.bind(null, actualite.id);

  return (
    <div className="flex flex-col gap-6">
      <p className="m-0 text-admin-muted">
        {images.length} image{images.length > 1 ? "s" : ""}. Utilisez les flèches pour réordonner. La première image
        versée devient automatiquement la couverture.
      </p>

      <div className="grid grid-cols-3 gap-5 max-[640px]:grid-cols-1 max-[1000px]:grid-cols-2">
        {images.map((image, i) => {
          const updateAlt = updateImageAlt.bind(null, actualite.id, image.id);
          const moveUp = moveActualiteImage.bind(null, actualite.id, image.id, "up");
          const moveDown = moveActualiteImage.bind(null, actualite.id, image.id, "down");
          const setCover = setCoverImage.bind(null, actualite.id, image.url);
          const isCover = actualite.coverImageUrl === image.url;

          return (
            <div key={image.id} className="flex flex-col gap-2.5 rounded-lg bg-admin-bg p-3">
              <div className="relative aspect-3/2 overflow-hidden rounded">
                <Image src={image.url} alt={image.alt ?? ""} fill className="object-cover" />
                <span className="absolute top-2 left-2 rounded bg-black/60 px-2 py-1 font-mono text-xs text-white">
                  {i + 1}
                </span>
                {isCover && (
                  <span className="absolute top-2 right-2 rounded bg-admin-accent px-2 py-1 font-mono text-xs text-white">
                    Couverture
                  </span>
                )}
              </div>

              <form action={updateAlt} className="flex gap-2">
                <input name="alt" defaultValue={image.alt ?? ""} placeholder="Texte alternatif" className={`${inputClass} py-1.5 text-sm`} />
                <button type="submit" className={`${secondaryButtonClass} px-3 py-1.5 text-xs`}>
                  OK
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5">
                <form action={moveUp}>
                  <button type="submit" className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`} disabled={i === 0}>
                    ↑
                  </button>
                </form>
                <form action={moveDown}>
                  <button
                    type="submit"
                    className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}
                    disabled={i === images.length - 1}
                  >
                    ↓
                  </button>
                </form>
                {!isCover && (
                  <form action={setCover}>
                    <button type="submit" className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}>
                      Couverture
                    </button>
                  </form>
                )}
                <DeleteButton
                  action={deleteActualiteImage.bind(null, actualite.id, image.id, image.url)}
                  confirmText="Retirer cette image de la galerie ?"
                  label="Retirer"
                  className="rounded border border-[#b3261e]/30 px-2.5 py-1.5 text-xs text-[#b3261e] hover:bg-[#b3261e]/5"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-dashed border-[#3a3733]/25 p-5">
        <UploadField action={upload} currentUrl={null} label="Nouvelle image" variant="compact" hint="JPEG, PNG ou WebP." />
      </div>
    </div>
  );
}
