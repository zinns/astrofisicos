import { Badge } from "@/components/ui/badge";
import { contactChannels, inquiryTypes } from "@/content/contact";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contacto",
  path: "/contacto",
  description: "Formulario base para solicitar informacion y contratar una experiencia.",
});

export default function ContactoPage() {
  return (
    <section className="section-shell">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Contacto"
          title="La conversion principal queda resuelta aqui"
          description="Por ahora el formulario es estructural. Mail y WhatsApp quedan visibles desde este primer skeleton, aunque sus datos siguen como placeholders hasta confirmacion del cliente."
        />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <form className="grid gap-4">
              <label className="grid gap-2 text-sm text-moon-300">
                Nombre
                <input className="input-field" name="name" placeholder="Tu nombre" type="text" />
              </label>
              <label className="grid gap-2 text-sm text-moon-300">
                Correo
                <input className="input-field" name="email" placeholder="tu@correo.com" type="email" />
              </label>
              <label className="grid gap-2 text-sm text-moon-300">
                Institucion / empresa
                <input className="input-field" name="organization" placeholder="Escuela, empresa o institucion" type="text" />
              </label>
              <label className="grid gap-2 text-sm text-moon-300">
                Tipo de experiencia
                <select className="input-field" name="service">
                  {inquiryTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-moon-300">
                Fecha estimada
                <input className="input-field" name="date" type="text" placeholder="Mes o fecha tentativa" />
              </label>
              <label className="grid gap-2 text-sm text-moon-300">
                Mensaje
                <textarea className="input-field min-h-36 resize-y" name="message" placeholder="Cuentanos que necesitas" />
              </label>
              <Button type="submit">Solicitar informacion</Button>
            </form>
          </Card>
          <div className="grid gap-6">
            {contactChannels.map((channel) => (
              <Card key={channel.label} className="space-y-4">
                <Badge variant="muted">Dato placeholder</Badge>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-semibold text-moon-50">{channel.label}</h3>
                  <a className="text-sm text-orbit-500 transition hover:text-orbit-400" href={channel.href}>
                    {channel.value}
                  </a>
                </div>
                <p className="text-sm leading-7 text-moon-300">{channel.description}</p>
              </Card>
            ))}
            <Card className="space-y-4">
              <h3 className="font-heading text-2xl font-semibold text-moon-50">Brief de conversion</h3>
              <p className="text-sm leading-7 text-moon-300">
                Este flujo ya recoge nombre, correo, institucion, tipo de experiencia, fecha estimada y mensaje. Cuando se confirme el canal operativo, el envio podra resolverse con mail, WhatsApp, un endpoint propio o ambos.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
