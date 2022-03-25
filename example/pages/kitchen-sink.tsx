import type { NextPage } from 'next'
import Link from 'next/link';
import Drawer from '../components/content/drawer';
import Popover from '../components/popover';
import { StyledButton } from '../global/button.styles';
import { StyledLink } from '../global/link.styles';
import { StyledPanel } from '../global/panel.styles';
import { Header1, Header2, Header3, Header4, Paragraph, StyledCode } from '../global/typography';
import { useSiteState } from '../hooks/useSiteState';
import { StyledPage } from '../global/page.styles';
import ImageGrid from '../components/content/imageGrid';
import dynamic from 'next/dynamic';
import { RawInvertTheme } from '../components/invertTheme';
import ParagraphComponent from '../components/content/paragraph';
import { StyledTwoColumns } from '../components/layouts/content/twoColumn.styles';
import { StyledDivider } from '../components/content/divider.styles';

const DynamicInvertTheme = dynamic(() => import('../components/invertTheme'), {
    ssr: false,
    loading: () => <RawInvertTheme />
});

const KitchenSink: NextPage = () => {
    const { setAlert, setNotification, setBannerActive } = useSiteState();

    return (
        <StyledPage>
            <Header1>Kitchen Sink</Header1>
            <StyledPanel>
                <Header4>Panel</Header4>
                <Paragraph>Paragraph Style</Paragraph>
                <Paragraph dangerouslySetInnerHTML={{ __html: "I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" }} />
                <Paragraph dangerouslySetInnerHTML={{ __html: "Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." }} />
                <Paragraph dangerouslySetInnerHTML={{ __html: "Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." }} />
                <Popover text="This is a quote from arrested Development">
                    <Paragraph dangerouslySetInnerHTML={{ __html: "I just haven't had sex in a month. You know, you've been here two months. It's hard to gauge time. So did you see the new Poof? His name's Gary, and we don't need anymore lawsuits. You were just a turd out there, you know? You couldn't kick, and you couldn't run, you know? You were just a turd. I'll buy you a hundred George Michaels that you can teach to drive! I know, I just call her Annabelle cause she's shaped like a…she's the belle of the ball!" }} />
                </Popover>
            </StyledPanel>
            <Header1>Header 1</Header1>
            <Header2>Header 2</Header2>
            <Header3>Header 3</Header3>
            <Header4>Header 4</Header4>
            <ParagraphComponent fullWidth={true} text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />
            <StyledTwoColumns>
                <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />
                <ParagraphComponent text="I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" />
            </StyledTwoColumns>
            <Paragraph dangerouslySetInnerHTML={{ __html: "I'M A MONSTER!! Popcorn shrimp… with club sauce. Oh, COME ON! This objectification of women has to stop. It's just Mom and whores. And with deep, deep concentration and, and great focus, he's often able to achieve an erect– Pound is tic-tac-toe right?" }} />
            <StyledDivider fullWidth={true} />
            <Paragraph dangerouslySetInnerHTML={{ __html: "Did you know that more frozen bananas are sold right here on this boardwalk than anywhere in the OC? You're Killing Me, Buster. What is she doing at a beauty pageant? Is she running the lights or something? This was a big get for God. Although George Michael had only got to second base, he'd gone in head first, like Pete Rose. Yo quiero leche. Yo quiero leche de madre." }} />
            <Paragraph dangerouslySetInnerHTML={{ __html: "Yo quiero leche. Yo quiero leche de madre. Yo quiero leche. Yo quiero leche de madre. Caw ca caw, caw ca caw, caw ca caw, caw ca caw. Hey, it was one night of wild passion! Michael: And yet you didn't notice her body? Gob: I like to look in the mirror. And guess what else is back. [slow wink] My breakfast? My friskiness. Mama horny Michael. Oh Gob, you could charm the black off a telegram boy." }} />
            <StyledCode >console.log()</StyledCode>
            <DynamicInvertTheme />
            <StyledButton onClick={() => setAlert({ title: 'Alert', text: 'Alertalert Alertalert Alertalert Alertalert Alertalertv Alertalert Alertalert Alertalert Alertalert', prompt: 'close' })}>Trigger Alert</StyledButton>
            <StyledButton onClick={() => setNotification({ title: 'Hello', text: 'hello there, here is a notification' })}>Trigger Notification</StyledButton>
            <StyledButton onClick={() => setBannerActive(true)}>Bring back banner</StyledButton>
            <Drawer title='Drawer'>
                <Paragraph>
                    Drawer Content
                </Paragraph>
            </Drawer>
            <StyledLink>
                <Link href="/">Link</Link>
            </StyledLink>
            <ImageGrid />
        </StyledPage>
    )
}

export default KitchenSink
