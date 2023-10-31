import { Badge, Box, Flex, HStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import Emoji from "./Emoji"
import CopyToClipboard from "./CopyToClipboard"
import InlineLink from "./Link"
import TutorialTags from "./TutorialTags"
// import Translation from "./Translation"
import Text from "./OldText"

import { Lang } from "../utils/languages"
import { getLocaleTimestamp } from "../utils/time"
import { TranslationKey } from "../utils/translations"

export interface IProps {
  tutorial: any
}

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-tutorial-${Skill[skill.toUpperCase() as keyof typeof Skill]}`

const TutorialMetadata: React.FC<IProps> = ({ tutorial }) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-developers-tutorials")

  const frontmatter = tutorial.frontmatter
  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const address = frontmatter.address

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      borderBottomWidth={{ base: 0, lg: "1px" }}
      borderBottomColor="border"
    >
      <Flex justifyContent="space-between" alignItems="center" w="full" mb={8}>
        <Flex flexWrap="wrap" w="full">
          <TutorialTags tags={frontmatter.tags} />
        </Flex>
        <Flex
          as={Badge}
          variant="secondary"
          alignSelf="flex-start"
          mb={2}
          whiteSpace="nowrap"
        >
          {t(getSkillTranslationId(frontmatter.skill))}
        </Flex>
      </Flex>
      <HStack
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        {author && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":writing_hand:" />
            {author}
          </Box>
        )}
        {hasSource && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":books:" />
            <InlineLink to={frontmatter.sourceUrl}>
              {frontmatter.source}
            </InlineLink>
          </Box>
        )}
        {published && (
          <Box>
            <Emoji fontSize="sm" mr={2} text=":calendar:" />
            {getLocaleTimestamp(locale! as Lang, published)}
          </Box>
        )}
        <Box>
          <Emoji fontSize="sm" mr={2} text=":stopwatch:" />
          {Math.round(tutorial.fields.readingTime.minutes)}{" "}
          {t("comp-tutorial-metadata-minute-read")}
        </Box>
      </HStack>
      <HStack
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
      >
        {address && (
          <Flex flexWrap="wrap" w="full" mr={4}>
            <CopyToClipboard text={frontmatter.address}>
              {(isCopied) => (
                <Text color="primary.base" cursor="pointer">
                  {!isCopied ? (
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      fontFamily="monospace"
                      bg="ednBackground"
                      px={1}
                      fontSize="sm"
                      _hover={{
                        bg: "primary100",
                      }}
                    >
                      <Text
                        as={Translation}
                        textTransform="uppercase"
                        id="comp-tutorial-metadata-tip-author"
                      />{" "}
                      {frontmatter.address}
                    </Box>
                  ) : (
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      fontFamily="monospace"
                      bg="ednBackground"
                      px={1}
                      fontSize="sm"
                      _hover={{
                        bg: "primary100",
                      }}
                    >
                      <Text
                        as={Translation}
                        textTransform="uppercase"
                        id="comp-tutorial-metadata-tip-author"
                      />{" "}
                      {frontmatter.address} {t("common:copied")}
                      <Emoji
                        fontSize="sm"
                        ml={2}
                        mr={2}
                        text=":white_check_mark:"
                      />
                    </Box>
                  )}
                </Text>
              )}
            </CopyToClipboard>
          </Flex>
        )}
      </HStack>
    </Flex>
  )
}

export default TutorialMetadata
